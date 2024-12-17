import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';

import { storage } from "@/constants/storage"
import { formData, formKeys } from "@/constants/formData"
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { streakData } from "@/constants/streaks";
import { populateStreaks  } from '@/constants/testData';

function singleDayStreakDisplay(streakKey:string){
    const [data, setData] = useMMKVObject<streakData>(streakKey);
    return (
        <View>
            <Text>Name:{data!.name} 
                Current Streak: {data!.currentStreak} 
                Longest Streak: {data!.longestStreak} 
                Most Recent: {data!.mostRecentDate.toString()}
            </Text>
            {/* <Text>{typeof data}</Text> */}
        </View>
    )
}

export default function streakDisplay(){
    const streakKeys = formKeys.map((key) => {
        return key+"Streak"
    })
    
    const allKeys = storage.getAllKeys()
    
    return(
        <ScrollView>
            {streakKeys.map((key) => (
                singleDayStreakDisplay(key)
            ))}
            <Button
                  title={"Populate Streaks"}
                  onPress={() => populateStreaks()}
            />
        </ScrollView>
    )
}