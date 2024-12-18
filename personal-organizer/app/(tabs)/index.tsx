import { SafeAreaView, View, TextInput, Text, ScrollView } from 'react-native';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';

import { streakData } from '@/constants/streaks';
import { styles } from '@/constants/stylesheet';

import streakPreview from '@/components/streakPreview'
import monthlyAverages from '@/components/monthlyAverages'

export default function HomeScreen() {
  const [streaks, setStreaks] = useMMKVObject<streakData[]>('streaks')
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <View>
          <Text style={styles.homescreenTitle}>Welcome Back!</Text>
        </View>
        <View>
          {streakPreview(streaks ? streaks : [])}
        </View>
        <View>
          {monthlyAverages()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

