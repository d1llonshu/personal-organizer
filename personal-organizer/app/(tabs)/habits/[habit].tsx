import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVObject } from 'react-native-mmkv';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Surface } from 'react-native-paper';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import { Calendar } from 'react-native-calendars';

import { Habit, habitHistory, timeframes } from "@/constants/habit";
import { styles, dropdownStyles, buttonColorTrue, calendarTheme } from "@/constants/stylesheet";
import { CustomButton } from "@/components/customButton";
import { passesFormValidation } from './newHabitForm';
import { generateDifferentDaysKey, getGoalForDate } from '@/components/helper';
import { Submissions } from '@/constants/FormData';

export default function habitsPage() {
    //currently does not update edits made visually you reload the page from list of habits
    const router = useRouter();
    const local = useLocalSearchParams<{habit: string}>();
    const [currentHabit, setCurrentHabit] = useState<Habit>();
    const [submissions, setSubmissions] = useMMKVObject<Submissions>("submissions");
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    const [goalText, setGoalText] = useState<string>("");
    const [editButton, setEditButton] = useState<boolean>(false);
    const [pageSections, setPageSections] = useState<JSX.Element[]>([]);
    const [prettyPrint, setPrettyPrint] = useState<string>("");
    const [goal, setGoal] = useState<string>("");
    const [timeframe, setTimeframe] = useState<string>("");
    let noEdit = (longestStreak: JSX.Element[]) => { return(
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
        {longestStreak}
      </View>
      <View>
        <Text style={styles.habitPageSubtitle}>Goal History: </Text>
        {displayHistory(currentHabit?currentHabit.history:[])}
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
    </Surface>)};

    let edit = (
    <Surface key={"infoSurface"} style={styles.homeScreenSurface} elevation={1}>
      <Text style={styles.habitPageSubtitle}>Edit:</Text>
      <View style={styles.row}>
        <Text style={dropdownStyles.titleWithEvenLessMargin}>Habit:</Text>
        <TextInput
            style={styles.textInput}
            placeholder='Biking'
            placeholderTextColor="gray" 
            value={prettyPrint}
            onChangeText={setPrettyPrint}
        />
      </View>
      <View style={dropdownStyles.dropdownRow}>
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
              return true;
            }

            console.log('Saving...');
            if (prettyPrint == "" || goal == undefined ||  timeframe == undefined){
              Alert.alert("All fields are required");
              return false; 
            }
            else if(passesFormValidation(prettyPrint, currentHabit.dataType, goal, currentHabit.category,timeframe, habits? habits:[])){
              let today = new Date();
              let todaysKey = 
              today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
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
              }
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
            setCurrentHabit(h);
          }
        });
      }
      
    }, [local.habit])

    useEffect(() => {
      if(currentHabit){
        setGoalText(createGoalText(currentHabit));
        setPrettyPrint(currentHabit.prettyPrint);
        setTimeframe(currentHabit.timeframe);
        setGoal(currentHabit.goal);
        // let sections : JSX.Element[] = [];
        // if(editButton){
        //   sections.push(edit);
        // }
        // else{
          
        //   sections.push(noEdit(" Not Available"));
        // }
        // setPageSections(sections);
      }
    }, [currentHabit]);

    useEffect(() => {
      let sections : JSX.Element[] = [];
      if(currentHabit && submissions){
        let calendar = createHabitCalendarMarks(currentHabit, submissions);
        
        let streak : JSX.Element = (<Text style={styles.habitPageRegularText}>{"Not Available"}</Text>);
        let dates = "";
        if(calendar.longestStreak.length > 0){
          streak = <Text style={styles.habitPageRegularText}>{String(calendar.longestStreak[0].length) + ((calendar.longestStreak[0].length == 1)? " day" : " days")}</Text>
          calendar.longestStreak = calendar.longestStreak.reverse();
          for(let i = 0; i < calendar.longestStreak.length; i++){
            dates = dates + "(" + prettyPrintDate(calendar.longestStreak[i].start) + " - " + prettyPrintDate(calendar.longestStreak[i].end) + ")";
            if(i != calendar.longestStreak.length -1){
              dates = dates + "\n";
            }
          }
        }
        if(editButton){
          sections.push(edit);
        }
        else{
          sections.push(noEdit([streak, <Text style={styles.habitPageRegularTextWithMargin}>{dates}</Text>]));
          sections.push(calendar.calendar);
        }
        
      }
      

      
      setPageSections(sections);
    }, [editButton, timeframe, prettyPrint, goal]);


    return(
        
        <SafeAreaView style = {styles.safeAreaContainer}>
          <ScrollView>
            <Stack.Screen options={{ title: currentHabit?.prettyPrint }} />
              {pageSections}
              {}

            {/* <View key="editButton" style = {styles.buttonContainer}>
              <Link href={{pathname:"/habits/[edit]", params: {edit: local.habit}}}>
                      <Text style={styles.dayPageHyperlink}>{"Edit"}</Text>
              </Link>
            </View> */}
        </ScrollView>
      </SafeAreaView>
    )
}
function createHabitCalendarMarks(habit: Habit, submissions: Submissions) : {calendar: JSX.Element, longestStreak: {start: string, end: string, length: number}[]} {
  const markedDates: { [key: string]: {disabled: boolean, startingDay: boolean, endingDay: boolean, color: string} } = {};
  let keys = Object.keys(submissions);
  let streakArr = [];
  let longestStreak : {start:string, end:string, length:number} = {
    start:"", end:"", length: 0
  };
  let ongoingStreak : {start:string, end:string, length:number} = {
    start:"", end:"", length: 0
  };

  if(habit.timeframe == "Daily"){
    for(let i = 0; i < keys.length; i++){
      if(Number(submissions[keys[i]][habit.habitID]) >= Number(getGoalForDate(habit, keys[i]).goal)){
        //streak continues, sets end to current date in case next entry doesn't meet goal
        if((new Date(keys[i-1]).getTime()) - (new Date(keys[i]).getTime()) === -86400000 && markedDates[keys[i-1]].disabled == false){
          markedDates[keys[i]] = {disabled: false, color: buttonColorTrue, startingDay: false, endingDay: false};
          ongoingStreak.length = ongoingStreak.length + 1;
          ongoingStreak.end = keys[i];//sets ongoing end
        }

        //starting new streak
        else{
          if(ongoingStreak.length > longestStreak.length){
            longestStreak = ongoingStreak;
          }
          //account for streaks of equal length
          else if(ongoingStreak.length == longestStreak.length && ongoingStreak.length != 0){
            streakArr.push(ongoingStreak);
          }
          ongoingStreak = {start:keys[i], end:"", length: 1};//sets ongoing start
          if(i != 0){
            markedDates[keys[i-1]].endingDay = true;
          }

          markedDates[keys[i]] = {disabled: false, color: buttonColorTrue, startingDay: true, endingDay: false};
        }
      }
      //doesn't start new streak but will end ongoing one
      else{
        if(ongoingStreak.length > longestStreak.length){
          longestStreak = ongoingStreak;
        }
        //account for streaks of equal length
        else if(ongoingStreak.length == longestStreak.length && ongoingStreak.length != 0){
          streakArr.push(ongoingStreak);
        }
        ongoingStreak = {start:"", end:"", length: 0};
        if(i != 0){
          markedDates[keys[i-1]].endingDay = true;
        }
        markedDates[keys[i]] = {disabled: true, color: "none", startingDay: false, endingDay: false};
      }
    }
    streakArr.push(longestStreak);
    
    console.log(streakArr);
    
    return({calendar:
    <Surface key={"calendarSurface"} style={styles.homeScreenSurface} elevation={1}>
      <Calendar 
        disableAllTouchEventsForDisabledDays
        enableSwipeMonths
        disabledByDefault
        minDate={keys[0]} 
        markingType={'period'}
        markedDates={markedDates}
        theme={calendarTheme}
        />
    </Surface>,
    longestStreak:streakArr})
  }
  else{//Weekly not implemented yet
    return({calendar:(<View></View>),
      longestStreak:[],
    })
  }
  
  
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
function displayHistory(history: habitHistory[]){
  
  let sections : JSX.Element[] = [];
  
  for(let i = 0; i < history.length; i++){
    prettyPrintDate(history[i].startDate);
    sections.push(<View key={"habitHistory"+i}>
      <Text style={styles.habitPageRegularTextWithMargin}>{history[i].goal}, {history[i].timeframe} {"("}{prettyPrintDate(history[i].startDate)} - {(history[i].endDate === "")?"Present":prettyPrintDate(history[i].endDate)}{")"}</Text>
    </View>);
  }
  return sections
}

function prettyPrintDate(date:string){
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let prettyPrint = shortMonths[Number(date.slice(5, 7))-1] + ". " + Number(date.slice(8, 10));
  if(date.slice(9, 10) === "1"){
    prettyPrint = prettyPrint + "st";
  }
  else if(date.slice(9, 10) === "2"){
    prettyPrint = prettyPrint + "nd";
  }
  else if(date.slice(9, 10) === "3"){
    prettyPrint = prettyPrint + "rd";
  }
  else{
    prettyPrint = prettyPrint + "th";
  }
  prettyPrint = prettyPrint + ", " + date.slice(0, 4);
  
  return prettyPrint;
}