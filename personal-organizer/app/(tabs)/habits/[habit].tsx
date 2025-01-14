import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { Link, usePathname, useLocalSearchParams, Stack} from 'expo-router';

import { Habit, dataTypes, timeClassifications, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet"

export default function habitsPage() {
    const local = useLocalSearchParams<{habit: string}>();
    const [currentHabit, setCurrentHabit] = useState<Habit>();
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    useEffect(() => {
      if(habits){
        habits.map((h)=> {
          if(h.keyName == local.habit){
            setCurrentHabit(h)
          }
        })
      }
      
    }, [local.habit])

    return(
        
        <SafeAreaView style = {styles.safeAreaContainer}>
          <ScrollView>
            <Stack.Screen options={{ title: local.habit }} />
            <Text style={styles.regularText}>{currentHabit?.category}</Text>
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