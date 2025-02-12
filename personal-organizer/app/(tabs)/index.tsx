import { SafeAreaView, View,  Text, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV, useMMKVObject } from 'react-native-mmkv';
import Ionicons from '@expo/vector-icons/Ionicons';

import { streakData } from '@/constants/streaks';
import { styles, backgroundColor, surfaceBackgroundColor, textColor } from '@/constants/stylesheet';

import { Submissions } from '@/constants/FormData';
import { Habit } from "@/constants/habit";
import printOngoingStreaks from '@/components/updateStreaksNew';

import createSummary from '@/components/habitProgress';
import { Surface } from 'react-native-paper';

import { generateConsecutiveKeys, generateDifferentDaysKey } from "@/components/helper";
import { CustomButton } from "@/components/customButton";


export default function HomeScreen() {

  const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
  if(habits === undefined){
    let temp : Habit[] = [];
    setHabits(temp);
  }
  // const [inactiveHabits, setInactiveHabits] = useMMKVObject<Habit[]>('inactiveHabits');
  // if(inactiveHabits === undefined){
  //   let temp : Habit[] = [];
  //   setInactiveHabits(temp);
  // }

  const [habitIDCounter, setHabitIDCounter] = useMMKVObject<number>('habitIDCounter');
  if(habitIDCounter === undefined){
    setHabitIDCounter(0);
  }

  const [submissions, setSubmissions] = useMMKVObject<Submissions>("submissions");
  if(submissions === undefined){
    let temp : Submissions = {};
    setSubmissions(temp);
  }
  const [todaysKeyIndex, setTodaysKeyIndex] = useMMKVObject<string>("todaysKeyIndex");
  let today = new Date();
  let submissionKey: string = 
    today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
  if(submissionKey !== todaysKeyIndex){
    setTodaysKeyIndex(submissionKey);
  }
   
  const [streakSection, setStreakSection] = useState<JSX.Element[]>([]);
  const [currentWeekSection, setCurrentWeekSection] = useState<JSX.Element[]>([]);
  const [mult, setMult] = useState<number>(0);
  //go through each submission checking the dates, if it's 1 day apart keep adding the streaks, else stop.
  useEffect(() => {
      console.log(mult);
      if(habits && submissions && todaysKeyIndex){
        setStreakSection(printOngoingStreaks(habits, submissions));
        let sundayKey = generateDifferentDaysKey(todaysKeyIndex, new Date(todaysKeyIndex).getUTCDay() + (7*(mult-1)));
        console.log(sundayKey);
        let keys = generateConsecutiveKeys(sundayKey, 7);
        let temp = createSummary(habits, submissions, keys);
        if(mult == 0){
          keys = generateConsecutiveKeys(todaysKeyIndex, new Date(todaysKeyIndex).getUTCDay());
          temp = createSummary(habits, submissions, generateConsecutiveKeys(todaysKeyIndex, new Date(todaysKeyIndex).getUTCDay()));
          temp[0] = (
            <View key={"WeeklyProgressHeader"} style={styles.centeredRow}>
                <Ionicons.Button style={styles.prevWeekButton} name="caret-back" size={16} color={textColor} backgroundColor={surfaceBackgroundColor} onPress={()=>{setMult(mult+1);}} />
                <Text style={styles.homeScreenSubtitle}>Week of {keys[keys.length-1]} </Text>
                <Ionicons.Button name="caret-forward" size={16} color={textColor} backgroundColor={surfaceBackgroundColor} onPress={()=>{}} />
            </View>
          );
        }
          
        else{
          temp[0] = (
            <View key={"WeeklyProgressHeader"} style={styles.centeredRow}>
              <Ionicons.Button name="caret-back" size={16} color="white" backgroundColor={surfaceBackgroundColor} onPress={()=>{setMult(mult+1);}} />
              <Text style={styles.homeScreenSubtitle}>Week of {keys[keys.length-1]} </Text>
              <Ionicons.Button name="caret-forward" size={16} color="white" backgroundColor={surfaceBackgroundColor} onPress={()=>{setMult(mult-1);}} />
            </View>
          );
        }
        
        setCurrentWeekSection(temp);
      }
      
  }, [habits, submissions, todaysKeyIndex, mult]);
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <View key="body">
          <Text style={styles.homescreenTitle}>Welcome Back!</Text>

          <Surface style={styles.homeScreenSurface} elevation={1}>{currentWeekSection}</Surface>
          <Surface style={styles.homeScreenSurface} elevation={1}>{streakSection}</Surface>
          
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

