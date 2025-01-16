import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { Link, usePathname, useLocalSearchParams, Stack} from 'expo-router';

import { Habit, dataTypes, timeframes, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet"
import { FormData, Submissions } from '@/constants/FormData';

export default function dayPage() {
    const local = useLocalSearchParams<{day: string}>();
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    const [days, setDays] = useMMKVObject<Submissions>('submissions');
    const [selectedDay, setSelectedDay] = useState<FormData>();

    useEffect(() => {
      if(days){
        setSelectedDay(days![local.day])
      }
      
    }, [local.day])

    return(
        
        <SafeAreaView style = {styles.safeAreaContainer}>
          <ScrollView>
            <Stack.Screen options={{ title: local.day }} />
            <Text style={styles.regularText}>{JSON.stringify(selectedDay)}</Text>
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