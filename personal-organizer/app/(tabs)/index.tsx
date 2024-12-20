import { SafeAreaView, View, TextInput, Text, ScrollView } from 'react-native';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';

import { streakData } from '@/constants/streaks';
import { styles } from '@/constants/stylesheet';

import streakPreview from '@/components/streakPreview'
import monthlyAverages from '@/components/monthlyAverages'
import monthlySummary from '@/components/monthlySummary';

export default function HomeScreen() {
  const [streaks, setStreaks] = useMMKVObject<streakData[]>('streaks')
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.homescreenTitle}>Welcome Back!</Text>
        </View>
        <View style={styles.container}>
          {streakPreview(streaks ? streaks : [])}
          {monthlySummary()}
        </View>
        <View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

