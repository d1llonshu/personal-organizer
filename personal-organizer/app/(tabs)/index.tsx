import { SafeAreaView, View, TextInput, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';

import { streakData } from '@/constants/streaks';
import { styles } from '@/constants/stylesheet';

import streakPreview from '@/components/streakPreview'
import monthlySummary from '@/components/monthlySummary';
import { FormData, Submissions } from '@/constants/FormData';
import { Habit, dataTypes, timeClassifications, categories, keyPrettyPrint } from "@/constants/habit"
import printStreaks from '@/components/updateStreaksNew';

export default function HomeScreen() {
  //todo - view individual events and/or overhaul form to be able to add events easier i.e give the events its own type
  const [streaks, setStreaks] = useMMKVObject<streakData[]>('streaks');
  const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
  const [submissions, setSubmissions] = useMMKVObject<Submissions>("submissions");
  
  const [streakSection, setStreakSection] = useState<JSX.Element[]>([]);
  //go through each submission checking the dates, if it's 1 day apart keep adding the streaks, else stop.
  useEffect(() => {
      setStreakSection(printStreaks(habits!, submissions!))
  }, [submissions])
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <View key="body">
          <Text style={styles.homescreenTitle}>Welcome Back!</Text>
          {/* {streakPreview(streaks ? streaks : [])}
          {monthlySummary()}  */}
          {
            streakSection
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

