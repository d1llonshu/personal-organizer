import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { Link, usePathname, useLocalSearchParams, Stack} from 'expo-router';

import { Habit, dataTypes, boolGoals, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet"
import { FormData, Submissions } from '@/constants/FormData';



export default function printStreaks(habits: Habit[], submissions: Submissions){
    let sections: JSX.Element[] = [];

    if(habits&&submissions){
        sections.push(
            <View key="StreakHomePageHeader">
                <Text style={styles.homeScreenSubtitle}>Streaks</Text>
            </View>
        )
        let streaks = calculateStreaks(habits, submissions);
        
        for (let i = 0; i < streaks.length; i++){
            if(habits[i].timeframe != "Once Weekly"){
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
        //throw Error("Habits or submissions missing")
        sections.push(
            <View key="StreakHomePageHeader">
                <Text style={styles.homeScreenSubtitle}>No Streaks, add some habits to get started! </Text>
            </View>
        )
        return sections
    }
   
}
function calculateStreaks(habits: Habit[], submissions: Submissions) : number[] {
    let dateKeys = Object.keys(submissions!).reverse();//assumes the submissions are sorted by date, newest first

    let dailyTargets : Habit[] = [];
    let weeklyTargets : Habit[] = [];
    
    habits.forEach((h) => {
        console.log(h.keyName + ": " + h.timeframe);
        if(h.timeframe === "Daily"){
            dailyTargets.push(h);
        }
        else{//only options are "Daily" and "Weekly" in interface at the moment
            weeklyTargets.push(h);
            console.log(h.keyName)
        }
    });
    
    if(submissions && habits && dateKeys.length >= 2){
        let streakCount = Array<number>(habits.length).fill(0);

        let dailyStreaks = Array<number>(dailyTargets.length).fill(0);
        let weeklyStreaks = Array<number>(weeklyTargets.length).fill(0);
        let weeklyTotals = Array<number>(weeklyTargets.length).fill(0);

        let mondayWeekStart = [0, 1, 2, 3, 4, 5, 6];
        // can we infer that dateKeys[0] is today as the form updates when the date is changed (?)
        console.log("all keys: " + dateKeys)
        let yesterdaysKey = generateDifferentDaysKey(dateKeys[0], 1);
        // let yesterdaysKey = generateDifferentDaysKey("2025/1/13", 1);
        let yesterDay = new Date(yesterdaysKey.replaceAll("/", "-")).getUTCDay();

        // most recent sunday to indicate a end full week/start point for counting backwards
        let sundayKey = generateDifferentDaysKey(yesterdaysKey, yesterDay);
        
        // need to track daily streaks that aren't apart of full weeks
        let keysBeforeFirstSunday = generateConsecutiveKeys(yesterdaysKey, yesterDay);
        console.log("Keys Before Sunday " + keysBeforeFirstSunday);


        let stats = calculateStatsForPeriod(habits, submissions, keysBeforeFirstSunday);

        console.log(stats);
        let reqForDailyStreak = keysBeforeFirstSunday.length;
        let stillCounting = 0;
        habits.forEach((h) => {
            if(h.timeframe === "Daily" && stats[h.keyName][0] == reqForDailyStreak){
                console.log(h.keyName + ", dailyStreak")
                stillCounting++;
            }
            else if(h.timeframe === "Weekly"){//only options are "Daily" and "Weekly" in interface at the moment
                console.log(h.keyName + ", weekly")
                stillCounting++;
            }
        });
        console.log(stillCounting);
        // while(stillCounting > 0){
        //     let oneWeek = generateConsecutiveKeys(sundayKey, 7);
        //     stillCounting = 0;
        // }


        //gen 1 week of keys
        //if last day of keys or less than last day of keys then check

        let daysElapsed = 0; //equal to the number of submissions that have been looped through
    
        // for(let i = 0; i < dateKeys.length - 1; i++){
        //     let d1 = new Date(dateKeys[i].replaceAll("/", "-")).getTime();
        //     let d2 = new Date(dateKeys[i+1].replaceAll("/", "-")).getTime();
        //     let stillCounting = 0;
        //     let consecutive = (d1-d2 === 86400000);//because key is a formatted date, d1-d2 should be exactly 86400000 ms apart
            
        //     let currentSubmission = submissions[dateKeys[i+1]];//skips first day on first run, which should be present day
            
        //     for(let hIndex = 0; hIndex < habits.length; hIndex++){//goes through each habit
        //         let currentHabit = habits[hIndex];
        //         if(currentHabit){//sometimes habits might not exist in earlier submissions
        //             if (currentHabit.dataType == "boolean"){
        //                 if (currentSubmission[currentHabit.keyName] == true && streakCount[hIndex] == daysElapsed){
        //                     stillCounting = stillCounting + 1;
        //                     streakCount[hIndex] = streakCount[hIndex] + 1;
        //                 }
        //             }
        //             else if (currentHabit.dataType == "number"){//will not work for weekly minutes, overriden later
        //                 if (currentSubmission[currentHabit.keyName] > 0 && streakCount[hIndex] == daysElapsed){
        //                     stillCounting = stillCounting + 1;
        //                     streakCount[hIndex] = streakCount[hIndex] + 1;
        //                 }
        //             }
        //         }
        //     }
        //     daysElapsed++;


        //     if(stillCounting === 0){
        //         i = dateKeys.length - 1;//terminate early
        //     }
        // }
        return streakCount
    }
    return []
}
// Important: Assumes it takes in consecutive keys
// number[] returns at index:
// 0: sum
// 1: streak length (starting from first entry)
function calculateStatsForPeriod(habits: Habit[], submissions: Submissions, keys: string[]) : {[key: string] : number[]}{
    let ret : {[key: string] : number[]} = {}
    let totalsCount = Array<number>(habits.length).fill(0);
    habits.forEach((h) => {
        ret[h.keyName] = Array<number>(2).fill(0);
    });
    let reqForStreak = 0;
    keys.forEach((key)=>{
        //if the submission exists
        if(submissions[key]){
            habits.forEach((h) => {
                let val = habitValueAsInt(h.keyName, submissions[key], h.dataType);
                // increment sum
                ret[h.keyName][0] = ret[h.keyName][0] + val; 
                // if positive and hasn't missed any days, increment streak
                if(val > 0 && ret[h.keyName][1] == reqForStreak){
                    ret[h.keyName][1]++;
                }
            });
        }
        reqForStreak++;
        console.log(reqForStreak);
    })
    return ret;
}

// Returns habit value as int, such that boolean true = 1 and false = 0. 
// Inputs:
// habit - habit.keyName, assumes valid for submission
// submission - formData for a given day
// dtype - valid habit datatype (currently "boolean" or "number")
// Output:
// a number correpsonding to habit data for given day such that boolean true = 1 and false = 0
function habitValueAsInt(habit: string, submission: FormData, dtype: string) : number {
    if(dtype === "boolean"){
        switch(submission[habit]){
            case true:
                return 1;
            case false:
                return 0;
            case undefined:
                return 0;
        }
    } 
    if (dtype === "number"){
        switch(submission[habit]){
            case undefined:
                return 0;
            default: 
                return Number(submission[habit]);
        }
    }
    
    return 0;//replace w/ throw error?
}

function generateDifferentDaysKey(key:string, daysBeforeProvidedKey:number){
    let newTime = new Date(key.replaceAll("/", "-")).getTime() - 86400000*daysBeforeProvidedKey;
    let newDate = new Date(newTime);
    // console.log(newDate)
    // console.log(newDate.getUTCDate());
    return(String(newDate.getUTCFullYear()) + "/" + String(newDate.getUTCMonth()+1) + "/" + String(newDate.getUTCDate()));
}

// starts from key provided then goes back x days
// arr[0] = key provided
function generateConsecutiveKeys(key:string, days:number){
    let arr = [];
    let count = 0;

    while(count < days){
        arr.push(generateDifferentDaysKey(key, count));
        count = count + 1;
    }

    return arr
}