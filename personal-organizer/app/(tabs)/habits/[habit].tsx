import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVObject } from 'react-native-mmkv';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Surface } from 'react-native-paper';

import { Habit } from "@/constants/habit"
import { styles } from "@/constants/stylesheet"

export default function habitsPage() {
    const local = useLocalSearchParams<{habit: string}>();
    const [currentHabit, setCurrentHabit] = useState<Habit>();
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    const [goalText, setGoalText] = useState<string>("");

    useEffect(() => {

      if(habits){
        habits.map((h)=> {
          if(h.keyName == local.habit){
            setCurrentHabit(h)
          }
        });
      }
      
    }, [local.habit])

    useEffect(() => {
      if(currentHabit){
        setGoalText(createGoalText(currentHabit));
      }
    }, [currentHabit])

    return(
        
        <SafeAreaView style = {styles.safeAreaContainer}>
          <ScrollView>
            <Stack.Screen options={{ title: local.habit }} />
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
                <Text style={styles.habitPageRegularText}>{"Coming soon!"}</Text>
              </View>
            </Surface>
            
            
            {/** TODO:  
             * Add streaks to new form
             * (?) Rework individual days storage from being the date as a key to putting all days in one JSON 
             */
            //  pageSections
            }
        </ScrollView>
      </SafeAreaView>
    )
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