//state management w/ array?
import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView } from 'react-native';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';
import { SafeAreaView } from 'react-native-safe-area-context';

import { storage } from "@/constants/storage"
import { formData, formKeysMinusDate } from "@/constants/formData"
import { Habit, dataTypes, timeClassifications, categories, keyPrettyPrint } from "@/constants/habit"
import updateStreaks from '@/components/updateStreaks'
import { streakData } from '@/constants/streaks';
import { CustomButton } from "@/components/customButton"
import { styles } from '@/constants/stylesheet'

export default function Form() {
    let today = new Date();
    let submissionKey: string = 
      today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + (today.getDate());
    
    const [data, setData] = useMMKVObject<formData>(submissionKey);
    const [streaks, setStreaks] = useMMKVObject<streakData[]>('streaks');
    const [habits, setHabits] = useMMKVObject<Habit[]>('allHabits');
    let categories : string[] = (habits? habits : []).map((h) => {
        return h.category
    });
    let uniqueCategories = new Set<string>(categories);
    let habitsByCategory: {[key: string]: string[]} = {};
    uniqueCategories.forEach((c) => {
        let hArr : string[] = [];
        (habits? habits : []).map((h) => {
            if (h.category == c){
                hArr.push(h.keyName)
            }
        });
        if(hArr.length > 0){
            habitsByCategory[c] = hArr
        }
    })
    console.log(habitsByCategory)
    

    //for useCallback updating, should contain all args
    const allArgs = formKeysMinusDate;

    //mounting
    useEffect(() => {

    } , [habits])

    const buttonColorFalse = "#CF6679";
    const buttonColorTrue = "#4f7942";
    // "#BB86FC" "#3700B3" "#84b067"
  
    return (
      <SafeAreaView style = {styles.safeAreaContainer}>
        <ScrollView style={styles.container}>
          {/** TODO: generate page by passing in habits by category, which then sorts out the 
           * habits by button/text input before creating the component
           */}
        </ScrollView>
      </SafeAreaView>
    );
  }
