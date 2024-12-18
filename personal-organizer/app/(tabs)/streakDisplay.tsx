import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';

import { storage } from "@/constants/storage"
import { formData, formKeysMinusDate } from "@/constants/formData"
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { streakData } from "@/constants/streaks";
import { populateStreaks  } from '@/constants/testData';
import updateStreaks from "@/components/updateStreaks"

function singleDayStreakDisplay(data:streakData){

    return (
        <View>
            <Text>Name:{data.name} 
                Current Streak: {data.currentStreak} 
                Longest Streak: {data.longestStreak} 
                Most Recent: {data.mostRecentDate}
            </Text>
            {/* <Text>{typeof data}</Text> */}
        </View>
    )
}

export default function streakDisplay(){
    const streakKeys = formKeysMinusDate.map((key) => {
        return key+"Streak"
    })

    const allKeys = storage.getAllKeys()
    const [streakData, setStreakData] = useMMKVObject<streakData[]>("streaks");
    
    return(
        <ScrollView>
            {streakData!.map((d) => {
                return <View key={d.name}>{singleDayStreakDisplay(d)}</View>
            })}
            {/* {streakKeys}
            {allKeys} */}
            <Button
                  title={"Populate Streaks"}
                  onPress={() => populateStreaks()}
            />
            <Button
                  title={"Update Streaks"}
                //   onPress={() => updateStreaks()}
            />
        </ScrollView>
    )
}