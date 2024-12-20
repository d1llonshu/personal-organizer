import { SafeAreaView, View, TextInput, Text, ScrollView } from 'react-native';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';

import { streakData } from '@/constants/streaks';
import { styles } from '@/constants/stylesheet';

import streakPreview from '@/components/streakPreview'
import monthlyAverages from '@/components/monthlyAverages'
import monthlySummary from '@/components/monthlySummary';

export default function HomeScreen() {
  //todo - view individual events and/or overhaul form to be able to add events easier i.e give the events its own type
  const [streaks, setStreaks] = useMMKVObject<streakData[]>('streaks')
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.homescreenTitle}>Welcome Back!</Text>
        </View>
        <View >
          {streakPreview(streaks ? streaks : [])}
          {monthlySummary()}
        </View>
        <View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

