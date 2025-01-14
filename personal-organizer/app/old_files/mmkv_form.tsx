import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView } from 'react-native';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';
// import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { storage } from "@/constants/storage"
import { formData, formKeysMinusDate } from "@/constants/old_files/oldFormData"
import updateStreaks from '@/components/old_files/updateStreaks'
import { streakData } from '@/constants/streaks';
import { CustomButton } from "@/components/customButton"
import { styles } from '@/constants/stylesheet'

export default function Form() {
    let today = new Date();
    let submissionKey: string = 
      today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + (today.getDate())
    
    const [data, setData] = useMMKVObject<formData>(submissionKey)
    const [streaks, setStreaks] = useMMKVObject<streakData[]>('streaks')

    //todo - integrate form hook controller
    //Personal Care 
    const [morningBrush, setMorningBrush] = useState<boolean>(data ? data.morningBrush : false);
    const [nightBrush, setNightBrush] = useState<boolean>(data ? data.nightBrush : false);
    const [usedMouthwash, setUsedMouthwash] = useState<boolean>(data ? data.usedMouthwash : false);
    const [washedFace, setWashedFace] = useState<boolean>(data ? data.washedFace : false);
    const [usedExfoliator, setUsedExfoliator] = useState<boolean>(data ? data.usedExfoliator : false);
    const [showered, setShowered] = useState<boolean>(data ? data.showered : false);
    const [tookMedicine, setTookMedicine] = useState<boolean>(data ? data.tookMedicine : false);

    //Workout
    const [minutesBiked, setMinutesBiked] = useState<string>(data ? data.minutesBiked.toString() : "0");
    const [situpsDone, setSitupsDone] = useState<string>(data ? data.situpsDone.toString() : "0");
    const [pushupsDone, setPushupsDone] = useState<string>(data ? data.pushupsDone.toString() : "0");

    //Productivity
    const [leetcodeMinutes, setLeetcodeMinutes] = useState<string>(data ? data.leetcodeMinutes.toString() : "0");
    const [personalProjectMinutes, setPersonalProjectMinutes] = useState<string>(data ? data.personalProjectMinutes.toString() : "0");
    const [artMinutes, setArtMinutes] = useState<string>(data ? data.artMinutes.toString() : "0");


    //for useCallback updating, should contain all args
    const allArgs = formKeysMinusDate;

    // const save = useCallback(() => {
    //   try {
    //     console.log('Saving...');
    //     // storage.clearAll()
    //     let submission : formData = {
    //         dateSubmitted: today,
    //         morningBrush: morningBrush,
    //         nightBrush: nightBrush,
    //         usedMouthwash: usedMouthwash,
    //         washedFace: washedFace,
    //         usedExfoliator: usedExfoliator,
    //         showered: showered,
    //         tookMedicine: tookMedicine,
    //         minutesBiked: parseInt(minutesBiked),
    //         situpsDone: parseInt(situpsDone),
    //         pushupsDone: parseInt(pushupsDone),
    //         leetcodeMinutes: parseInt(leetcodeMinutes),
    //         personalProjectMinutes: parseInt(personalProjectMinutes),
    //         artMinutes: parseInt(artMinutes)
    //     }
    //     setData(submission);
    //     //setStreaks(updateStreaks(streaks ? streaks : [], submission))
    //   } catch (e) {
    //     console.error('Error:', e);
    //   }
    // }, allArgs);

    const save = () => {
      console.log('Saving...');
      let submission : formData = {
        dateSubmitted: today,
        morningBrush: morningBrush,
        nightBrush: nightBrush,
        usedMouthwash: usedMouthwash,
        washedFace: washedFace,
        usedExfoliator: usedExfoliator,
        showered: showered,
        tookMedicine: tookMedicine,
        minutesBiked: parseInt(minutesBiked),
        situpsDone: parseInt(situpsDone),
        pushupsDone: parseInt(pushupsDone),
        leetcodeMinutes: parseInt(leetcodeMinutes),
        personalProjectMinutes: parseInt(personalProjectMinutes),
        artMinutes: parseInt(artMinutes)
      }
      // storage.clearAll()
      setData(submission);
      setStreaks(updateStreaks(streaks ? streaks : [], submission))
      
    }
    const buttonColorFalse = "#CF6679";
    const buttonColorTrue = "#4f7942";
    // "#BB86FC" "#3700B3" "#84b067"
  
    return (
      //todo: handle updating one field at a time/reading so you don't have to do it in one sitting (done, sort of)
      //      edit today's and previous days submissions
      <SafeAreaView style = {styles.safeAreaContainer}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.title}>Personal Care: </Text>
            <View style={styles.buttonRow}>
                <CustomButton 
                  title={"Brushed Teeth (Morning)"} 
                  onPress={() => {console.log("Updated!"); setMorningBrush(!morningBrush)}}
                  color={morningBrush ? buttonColorTrue : buttonColorFalse }/>
                <CustomButton
                    title={"Brushed Teeth (Night)"}
                    onPress={() => setNightBrush(!nightBrush)}
                    color={nightBrush ? buttonColorTrue : buttonColorFalse }
                />
                <CustomButton
                    title={"Mouthwash"}
                    onPress={() => setUsedMouthwash(!usedMouthwash)}
                    color={usedMouthwash ? buttonColorTrue : buttonColorFalse}
                />
                <CustomButton
                    title={"Washed Face"}
                    onPress={() => setWashedFace(!washedFace)}
                    color={washedFace ? buttonColorTrue : buttonColorFalse}
                />
                <CustomButton
                    title={"Used Exfoliator"}
                    onPress={() => setUsedExfoliator(!usedExfoliator)}
                    color={usedExfoliator ? buttonColorTrue : buttonColorFalse}
                />
                <CustomButton
                    title={"Showered"}
                    onPress={() => setShowered(!showered)}
                    color={showered ? buttonColorTrue : buttonColorFalse}
                />
                <CustomButton
                    title={"Took Medication"}
                    onPress={() => setTookMedicine(!tookMedicine)}
                    color={tookMedicine ? buttonColorTrue : buttonColorFalse}
                />
            </View>
          </View>


          <View>
            <Text style={styles.title}>Workout: </Text>
            <View style={styles.row}>
                <Text style={styles.textInputTitle}>Biking:</Text>
                <TextInput
                    style={styles.textInput}
                    value={minutesBiked}
                    onChangeText={setMinutesBiked}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.textInputTitle}>Situps:</Text>
                <TextInput
                    style={styles.textInput}
                    value={situpsDone}
                    onChangeText={setSitupsDone}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.textInputTitle}>Pushups:</Text>
                <TextInput
                    style={styles.textInput}
                    value={pushupsDone}
                    onChangeText={setPushupsDone}
                    keyboardType='numeric'
                />
            </View>
          </View>
          

          <View>
            <Text style={styles.title}>Productivity:</Text>
            <View style={styles.row}>
                <Text style={styles.textInputTitle}>Leetcode:</Text>
                <TextInput
                    style={styles.textInput}
                    value={leetcodeMinutes}
                    onChangeText={(text) => { console.log("Updated!"); setLeetcodeMinutes(text); }}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.textInputTitle}>Personal Project:</Text>
                <TextInput
                    style={styles.textInput}
                    value={personalProjectMinutes}
                    onChangeText={setPersonalProjectMinutes}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.textInputTitle}>Art:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={artMinutes}
                    value={artMinutes}
                    onChangeText={setArtMinutes}
                    keyboardType='numeric'
                />
            </View>
            
          </View>
      
          <CustomButton               
              title={"Submit"}
              onPress={()=>{
                save();
              }}
              color = {buttonColorTrue}
            />
        </ScrollView>
      </SafeAreaView>
    );
  }
