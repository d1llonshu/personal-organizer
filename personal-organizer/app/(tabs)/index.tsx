import { SafeAreaView, View,  Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV, useMMKVObject } from 'react-native-mmkv';

import { streakData } from '@/constants/streaks';
import { styles } from '@/constants/stylesheet';

import { Submissions } from '@/constants/FormData';
import { Habit } from "@/constants/habit"
import printStreaks from '@/components/updateStreaksNew';

import currentWeekSummary from '@/components/habitProgress';
import { Surface } from 'react-native-paper';

import { sampleSubmissions, sampleHabits } from '@/constants/sampleData';

export default function HomeScreen() {

  const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
  const [submissions, setSubmissions] = useMMKVObject<Submissions>("submissions");
  const [todaysKey, setTodaysKey] = useMMKVObject<string>("todaysKey");
  
  const [streakSection, setStreakSection] = useState<JSX.Element[]>([]);
  const [currentWeekSection, setCurrentWeekSection] = useState<JSX.Element[]>([]);
  //go through each submission checking the dates, if it's 1 day apart keep adding the streaks, else stop.
  useEffect(() => {
      setStreakSection(printStreaks(habits!, submissions!));
      setCurrentWeekSection(currentWeekSummary(habits!, submissions!, todaysKey!));
  }, [habits, submissions])
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <View key="body">
          <Text style={styles.homescreenTitle}>Welcome Back!</Text>

          <Surface style={styles.homeScreenSurface} elevation={1}>{currentWeekSection}</Surface>
          <Surface style={styles.homeScreenSurface} elevation={1}>{streakSection}</Surface>
          
          {/* <View key="setSampleData" style = {styles.buttonContainer}>
            <Pressable onPress={() => {
                setHabits(sampleHabits);
                setSubmissions(sampleSubmissions);
            }}
                style={() => [
                    {
                        backgroundColor:  "#4f7942",
                        padding: 5,
                        borderRadius: 4,
                    },
                ]}>
                <Text  style={styles.buttonTitle}>SET TO SAMPLE DATA</Text>
            </Pressable >
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

