import { SafeAreaView, View,  Text, ScrollView, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV, useMMKVObject } from 'react-native-mmkv';

import { streakData } from '@/constants/streaks';
import { styles } from '@/constants/stylesheet';

import { Submissions } from '@/constants/FormData';
import { Habit } from "@/constants/habit";
import printStreaks from '@/components/updateStreaksNew';

import createSummary from '@/components/habitProgress';
import { Surface } from 'react-native-paper';

import { generateConsecutiveKeys } from "@/components/helper";



export default function HomeScreen() {

  const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
  if(habits === undefined){
    let temp : Habit[] = [];
    setHabits(temp);
  }

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
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
  if(submissionKey !== todaysKeyIndex){
    setTodaysKeyIndex(submissionKey);
  }
  
  const [streakSection, setStreakSection] = useState<JSX.Element[]>([]);
  const [currentWeekSection, setCurrentWeekSection] = useState<JSX.Element[]>([]);
  //go through each submission checking the dates, if it's 1 day apart keep adding the streaks, else stop.
  useEffect(() => {
      if(habits && submissions && todaysKeyIndex){
        setStreakSection(printStreaks(habits, submissions));
        setCurrentWeekSection(createSummary(habits, submissions, generateConsecutiveKeys(todaysKeyIndex, new Date(todaysKeyIndex).getUTCDay())));
      }
      
  }, [habits, submissions, todaysKeyIndex]);
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

