import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { storage } from "@/constants/storage"
import { formData, formKeysMinusDate } from "@/constants/old_files/oldFormData"
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { streakData } from "@/constants/streaks";
import { populateStreaks  } from '@/constants/testData';
import updateStreaks from "@/components/old_files/updateStreaks"

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
    // if(typeof streakData == undefined){
    //     populateStreaks()
    // }
    
    return(
        <SafeAreaView>
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
        </SafeAreaView>
        
    )
}