import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVObject } from 'react-native-mmkv';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Surface } from 'react-native-paper';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';

import { Habit, habitHistory, timeframes } from "@/constants/habit";
import { styles, dropdownStyles } from "@/constants/stylesheet";
import { CustomButton } from "@/components/customButton";
import { passesFormValidation } from './newHabitForm';
import { generateDifferentDaysKey } from '@/components/helper';

export default function habitsPage() {
    //currently does not update edits made visually you reload the page from list of habits
    const router = useRouter();
    const local = useLocalSearchParams<{habit: string}>();
    const [currentHabit, setCurrentHabit] = useState<Habit>();
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    const [goalText, setGoalText] = useState<string>("");
    const [editButton, setEditButton] = useState<boolean>(false);
    const [pageSections, setPageSections] = useState<JSX.Element[]>([]);
    const [prettyPrint, setPrettyPrint] = useState<string>("");
    const [goal, setGoal] = useState<string>("");
    const [timeframe, setTimeframe] = useState<string>("");
    const noEdit = (
    <Surface style={styles.homeScreenSurface} elevation={1}>
      <View style={styles.row}>
        <Text style={styles.habitPageSubtitle}>Category: </Text>
        <Text style={styles.habitPageRegularText}>{currentHabit?.category}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.habitPageSubtitle}>Goal: </Text>
        <Text style={styles.habitPageRegularText}>{goalText}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.habitPageSubtitle}>Longest Streak: </Text>
        <Text style={styles.habitPageRegularText}>{"Coming soon!"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.habitPageSubtitle}>History: </Text>
        <Text style={styles.habitPageRegularText}>{JSON.stringify(currentHabit?.history)}</Text>
      </View>
      <View key={"editButton"}>
      <CustomButton               
        title={"Edit"}
        disabled={false}
        onPress={()=>{
          setEditButton(!editButton);
        }}
        color = "#4f7942"
      />
      </View>
    </Surface>);

    const edit = (
    <Surface style={styles.homeScreenSurface} elevation={1}>
      <Text style={styles.title}>Edit:</Text>
      <View key={"nameInput"}style={styles.row}>
        <Text style={dropdownStyles.title}>Habit:</Text>
        <TextInput
            style={styles.textInput}
            placeholder='Biking'
            placeholderTextColor="gray" 
            value={prettyPrint}
            onChangeText={setPrettyPrint}
        />
      </View>
      <View style={styles.row}>
        <Text style={dropdownStyles.title}>Goal:</Text>
        <TextInput
            style={styles.textInput}
            placeholder='1'
            placeholderTextColor="gray" 
            value={goal}
            onChangeText={setGoal}
            keyboardType='numeric'
        />
        <Dropdown
            style={dropdownStyles.dropdownSmall}
            placeholderStyle={dropdownStyles.placeholderStyle}
            selectedTextStyle={dropdownStyles.selectedTextStyle}
            inputSearchStyle={dropdownStyles.inputSearchStyle}
            iconStyle={dropdownStyles.iconStyle}
            data={timeframes}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={timeframe}
            onChange={item => {
              setTimeframe(item.value);
            }}
          />
      </View>
      <CustomButton               
        title={"Save"}
        disabled={false}
        onPress={()=>{
          if(save()){
            router.back();
          }
        }}
        color = "#4f7942"
      />
      <CustomButton               
        title={"Cancel"}
        disabled={false}
        onPress={()=>{
          setEditButton(!editButton);
        }}
        color = "#CF6679"
      />
    </Surface>);
    const save = () => {
          // needs field validation
          if(currentHabit && habits){
            if (prettyPrint == currentHabit.prettyPrint && goal == currentHabit.goal &&  timeframe == currentHabit.timeframe){
              console.log("Nothing changed, not creating new history entry.");
              return true
            }

            console.log('Saving...');
            if (prettyPrint == "" || goal == undefined ||  timeframe == undefined){
              Alert.alert("All fields are required");
              return false; 
            }
            else if(passesFormValidation(prettyPrint, currentHabit.dataType, goal, currentHabit.category,timeframe, habits? habits:[])){
              let today = new Date();
              let todaysKey = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
              let historyCopy = currentHabit.history;
              console.log(currentHabit);
              //only want new history entry if goals have changed. if just the name has changed we don't need a new one
              if(goal != currentHabit.goal || timeframe != currentHabit.timeframe){
                historyCopy[currentHabit.history.length - 1] = {
                  startDate: currentHabit.history[currentHabit.history.length - 1].startDate,
                  endDate: generateDifferentDaysKey(todaysKey, 1),
                  goal: currentHabit.history[currentHabit.history.length - 1].goal,
                  timeframe: currentHabit.history[currentHabit.history.length - 1].timeframe,
                };
                historyCopy.push({
                  startDate: todaysKey,
                  endDate: "",
                  goal: goal,
                  timeframe: timeframe,
                });
              }
              let habitArrCopy = habits;
              habitArrCopy[Number(currentHabit.habitID)] = {
                prettyPrint: prettyPrint,
                habitID: currentHabit.habitID,
                dataType: currentHabit.dataType,
                goal: goal,
                timeframe: timeframe,
                category: currentHabit.category,
                history: historyCopy,
              };
              setHabits(habitArrCopy);
              return true;
            }
          }
          else{
            Alert.alert("Could not save: Habit missing");
            return false;
          }
         
        };

    useEffect(() => {

      if(habits){
        habits.map((h)=> {
          if(h.habitID === local.habit){
            setCurrentHabit(h)
          }
        });
      }
      
    }, [local.habit])

    useEffect(() => {
      if(currentHabit){
        setGoalText(createGoalText(currentHabit));
        setPrettyPrint(currentHabit.prettyPrint);
        setTimeframe(currentHabit.timeframe);
        setGoal(currentHabit.goal)
        let sections : JSX.Element[] = []
        if(editButton){
          sections.push(edit);
        }
        else{
          sections.push(noEdit);
        }
        setPageSections(sections);
      }
    }, [currentHabit]);

    useEffect(() => {
      let sections : JSX.Element[] = []
      if(editButton){
        sections.push(edit);
      }
      else{
        sections.push(noEdit);
      }
      setPageSections(sections);
    }, [editButton, timeframe, prettyPrint, goal]);


    return(
        
        <SafeAreaView style = {styles.safeAreaContainer}>
          <ScrollView>
            <Stack.Screen options={{ title: local.habit }} />
              {pageSections}
            
            {/* <View key="editButton" style = {styles.buttonContainer}>
              <Link href={{pathname:"/habits/[edit]", params: {edit: local.habit}}}>
                      <Text style={styles.dayPageHyperlink}>{"Edit"}</Text>
              </Link>
            </View> */}
        </ScrollView>
      </SafeAreaView>
    )
}

function createGoalText(habit: Habit){
  let text = "";
  if(habit.goal === "1" && habit.dataType === "boolean"){
    text = "Once " + habit.timeframe;
  }
  else{
    text = habit.goal + " " + ((habit.dataType === "boolean")? "times":"minutes") + " " + ((habit.timeframe == "Daily")? "per day" : "per week");
  }
  return text;
}