import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { Link, usePathname, useLocalSearchParams, Stack} from 'expo-router';

import { Habit, dataTypes, timeClassifications, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet"
import { FormData, Submissions } from '@/constants/FormData';



export default function printStreaks(habits: Habit[], submissions: Submissions){
    let sections: JSX.Element[] = [];
    sections.push(
        <View key="StreakHomePageHeader">
            <Text style={styles.homeScreenSubtitle}>Current Streaks</Text>
        </View>
    )
    if(habits&&submissions){
        let streaks = calculateStreaks(habits, submissions);
        
        for (let i = 0; i < streaks.length; i++){
            if( habits[i].timeClassification != "Once Weekly"){
                sections.push(
                    <View key={habits[i].keyName+"StreakPrint"}>
                        <Text style={styles.regularText}>{habits[i].prettyPrint}: {streaks[i]} {(streaks[i] == 1) ? "day" : "days"}</Text>
                    </View>
                )
            }
        }
        return sections
    }
    else{
        throw Error("Habits or submissions missing")
    }
   
}
function calculateStreaks(habits: Habit[], submissions: Submissions) : number[] {
    let dateKeys = Object.keys(submissions!).reverse();//assumes the submissions are sorted by date, newest first
    
    if(submissions && habits && dateKeys.length >= 2){
        let streakCount = Array<number>(habits.length).fill(0);
        let minForStreak = 0; //equal to the number of submissions that have been looped through
    
        for(let i = 0; i < dateKeys.length - 1; i++){
            let d1 = new Date(dateKeys[i].replaceAll("/", "-")).getTime();
            let d2 = new Date(dateKeys[i+1].replaceAll("/", "-")).getTime();
            let stillCounting = 0;
            if(d1-d2 === 86400000){//because key is a formatted date, d1-d2 should be exactly 86400000 ms apart
                let sub = submissions[dateKeys[i+1]];//skips first day on first run, which should be present day
                for(let hIndex = 0; hIndex < habits.length; hIndex++){//goes through each habit
                    let currentHabit = habits[hIndex];
                    if(currentHabit){//sometimes habits might not exist in earlier submissions
                        if (currentHabit.dataType == "boolean"){
                            if (sub[currentHabit.keyName] == true && streakCount[hIndex] == minForStreak){
                                stillCounting = stillCounting + 1;
                                streakCount[hIndex] = streakCount[hIndex] + 1;
                            }
                        }
                        else if (currentHabit.dataType == "number"){
                            if (sub[currentHabit.keyName] > 0 && streakCount[hIndex] == minForStreak){
                                stillCounting = stillCounting + 1;
                                streakCount[hIndex] = streakCount[hIndex] + 1;
                            }
                        }
                    }
                }
                minForStreak++;
            }
            else{
                // console.log("exiting because of missing entry")
                // console.log(streakCount)
                i = dateKeys.length - 1;
            }
            if (stillCounting === 0){
                // console.log("exiting because reached end for each habit")
                // console.log(streakCount)
                i = dateKeys.length - 1;
            }
            // console.log(dateKeys);
        }
        return streakCount
    }
    return []
}