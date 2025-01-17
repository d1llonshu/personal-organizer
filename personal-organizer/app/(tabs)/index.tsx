import { SafeAreaView, View, TextInput, Text, ScrollView, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';

import { streakData } from '@/constants/streaks';
import { styles } from '@/constants/stylesheet';

import streakPreview from '@/components/old_files/streakPreview'
import monthlySummary from '@/components/old_files/monthlySummary';
import { FormData, Submissions } from '@/constants/FormData';
import { Habit, dataTypes, categories, keyPrettyPrint } from "@/constants/habit"
import printStreaks from '@/components/updateStreaksNew';
import monthlySummaryNew from '@/components/monthlySummaryNew';

import currentWeekSummary from '@/components/habitProgress';
import { Surface } from 'react-native-paper';

import { sampleSubmissions, sampleHabits } from '@/constants/sampleData';

export default function HomeScreen() {
  const [streaks, setStreaks] = useMMKVObject<streakData[]>('streaks');
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
          {/* {streakPreview(streaks ? streaks : [])}
          {monthlySummary()}  */}

          
          <Surface style={styles.homeScreenSurface} elevation={1}>{streakSection}</Surface>
          <Surface style={styles.homeScreenSurface} elevation={1}>{currentWeekSection}</Surface>
          
          <View key="setSampleData" style = {styles.buttonContainer}>
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
                </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

