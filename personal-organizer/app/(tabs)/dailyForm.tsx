//state management w/ array?
import { useState, useEffect } from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';
import { useMMKVObject  } from 'react-native-mmkv';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Habit } from "@/constants/habit"
// import updateStreaks from '@/components/updateStreaks'
import { CustomButton } from "@/components/customButton"
import { styles } from '@/constants/stylesheet'
import { FormData, Submissions } from '@/constants/FormData';

export default function Form() {
    const router = useRouter();
    const buttonColorFalse = "#CF6679";
    const buttonColorTrue = "#4f7942";
    let today = new Date();
    let submissionKey: string = 
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate());

    const [todaysKey, setTodaysKey] = useMMKVObject<string>("todaysKey");
    if(submissionKey !== todaysKey){
      setTodaysKey(submissionKey);
    }
    
    const [submissions, setSubmissions] = useMMKVObject<Submissions>("submissions");

    
    const [data, setData] = useState<FormData>();
    if(submissions && submissions[submissionKey] && data === undefined){
      setData(submissions[submissionKey]);
    }
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    
    const [formSections, setFormSections] = useState<JSX.Element[]>([]);
    
    useEffect(() => {
      //if there is an existing submission for the day
      if(submissions) {
        console.log("submissions exists");
        if(submissions[submissionKey]){
          console.log("submission found for today: ");
          console.log(submissions[submissionKey]);
          setData(submissions[submissionKey]);
        }
        else{
          console.log("no submission found for today, making new form")
          if (habits) {
            let defaultData: FormData = {};
            habits.forEach((habit) => {
              if (habit.dataType === 'boolean') {
                defaultData[habit.keyName] = false;
              } else if (habit.dataType === 'number') {
                defaultData[habit.keyName] = '0';
              } else {
                defaultData[habit.keyName] = 'ERROR THIS SHOULD NOT APPEAR';
              }
            });

            setData(defaultData);
            setSubmissions({
              ...submissions,
              [submissionKey]: defaultData,
            });
          }
          else{
            throw Error("Habits not found");
          }
        }
      }
      //if there is not an existing submission for the day
      else{
        throw Error("Submissions not found")
      }

      if (habits){
        let categories : string[] = (habits).map((h) => {
          return h.category
        });
        let uniqueCategories = new Set<string>(categories);
        let habitsByCategory: {[key: string]: Habit[]} = {};
        uniqueCategories.forEach((c) => {
            let hArr : Habit[] = [];
            (habits? habits : []).map((h) => {
                if (h.category == c){
                    hArr.push(h)
                }
            });
            if(hArr.length > 0){
                habitsByCategory[c] = hArr
            }
        })
        generateForm(habitsByCategory)
      }
      
    }, [habits, submissions, todaysKey]);

    const handleInputChange = (key: string, value: any) => {
      // setData((prevData: FormData) => ({
      //   ...prevData,
      //   [key]: value,
      // }));
      
      if (data) {
        let temp = data;
        temp[key] = value;
        setData(temp);
        setSubmissions({
          ...submissions,
          [submissionKey]: temp,
        });
      }
      console.log(key + ": " + value);
      console.log(data);
      console.log(submissions![submissionKey]);
      
    };
    const generateForm = (habitsByCategory: { [key: string]: Habit[] }) => {
      let sections: JSX.Element[] = [];
      for (const category in habitsByCategory) {
        let habitButtons = habitsByCategory[category].map((h) => {
          switch (h.dataType) {
            case 'boolean':
              return(
                <View key={h.keyName+"Button"}>
                  <CustomButton
                    title={h.prettyPrint}
                    disabled = {false}
                    onPress={() => {handleInputChange(h.keyName, !data?.[h.keyName])
                    }}
                    color={(data?.[h.keyName]? buttonColorTrue : buttonColorFalse) || "#FFA500"}
                  />
                </View>
                
              );
            default:
              return null;
          }
        });
        let habitTextInputs = habitsByCategory[category].map((h) => {
          switch (h.dataType) {
            case 'number':
              return(
                <View key={h.keyName+"TextInput"}style={styles.row}>
                  <Text style={styles.textInputTitle}>{h.prettyPrint}:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={data?.[h.keyName] || ''}
                    onChangeText={(value) => handleInputChange(h.keyName, value)}
                    keyboardType='numeric'
                  />
                </View>
              );
            default:
              return null;
          }
        });
        sections.push(
          <View key={category}>
            <Text style={styles.title}>{category}:</Text>
            <View style={styles.buttonRow}>{habitButtons}</View>
            {habitTextInputs}
          </View>
        );
      }
      sections.push(
        <View key="SaveButton" style = {styles.formSaveButton}>
          <CustomButton               
            title={"Save"}
            disabled = {false}
            onPress={()=>{
              setData(data);
              console.log(data);
              router.replace({ pathname: "/(tabs)" })//index
            }}
            color = {buttonColorTrue}
          />
        </View>
        
      )
      setFormSections(sections);
    }

    // "#BB86FC" "#3700B3" "#84b067"
  
    return (
      <SafeAreaView style = {styles.safeAreaContainer}>
        <ScrollView style={styles.formContainer}>
          {formSections}
        </ScrollView>
      </SafeAreaView>
    );
  }
