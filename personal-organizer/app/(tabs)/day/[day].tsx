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
    const [infoSections, setInfoSections] = useState<JSX.Element[]>([]);

    useEffect(() => {
      if(days){
        setSelectedDay(days[local.day]);
        let sections : JSX.Element[] = [];
        if(habits){
          habits.forEach((h) => {
            let text = "";
            if(days[local.day][h.keyName] !== undefined){
              if(h.dataType === "boolean"){
                text = ((days[local.day][h.keyName])? "Completed":"Did not complete");
              }
              else if(h.dataType === "number"){
                text = String(days[local.day][h.keyName]) + " minute" + ((days[local.day][h.keyName] !== 1)? "s":"");
              }
            }
            sections.push(
              <View key={h.keyName+"Info"} style={styles.row}>
                <Text style={styles.dayPageSubtitle}>{h.prettyPrint}: </Text>
                <Text style={styles.dayPageRegularText}>{text}</Text>
                
              </View>
            );
          });
        }
        setInfoSections(sections);
      }
      
    }, [local.day])

    return(
        
        <SafeAreaView style = {styles.safeAreaContainer}>
          <ScrollView>
            <Stack.Screen options={{ title: local.day }} />
            {/** TODO:  
             * Add streaks to new form
             * (?) Rework individual days storage from being the date as a key to putting all days in one JSON 
             */
              infoSections
            }
        </ScrollView>
      </SafeAreaView>
    )
}