import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text } from 'react-native';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';
// import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { storage } from "@/constants/storage"
import { formData } from "@/constants/formData"
import { dateFormat } from '@/constants/DateFormat';

export default function App() {
    let today = new Date();
    let submissionKey: string = 
      today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()
    const [data, setData] = useMMKVObject<formData>(submissionKey)

    const [text, setText] = useState<string>('');
    const [key, setKey] = useState<string>('');
    const [keys, setKeys] = useState<string[]>([]);

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
    const allArgs = [morningBrush, nightBrush, usedMouthwash, washedFace, usedExfoliator, showered, tookMedicine,
      minutesBiked, situpsDone, pushupsDone, leetcodeMinutes, personalProjectMinutes, artMinutes];

    const save = useCallback(() => {
      if (key == null) {
        Alert.alert('Empty key!', 'Enter a key first.');
        return;
      }
      try {
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
        setData(submission);
      } catch (e) {
        console.error('Error:', e);
      }
    }, allArgs);
    
    const read = useCallback(() => {
      if (key == null || key.length < 1) {
        Alert.alert('Empty key!', 'Enter a key first.');
        return;
      }
      try {
        console.log('getting...');
        const value = storage.getString(key);
        console.log('got:', value);
        Alert.alert('Result', `"${key}" = "${value}"`);
      } catch (e) {
        console.error('Error:', e);
        Alert.alert('Failed to get value for key "test"!', JSON.stringify(e));
      }
    }, [key]);
  
    useEffect(() => {
      try {
        console.log('getting all keys...');
        const _keys = storage.getAllKeys();
        setKeys(_keys);
        console.log('MMKV keys:', _keys);
      } catch (e) {
        console.error('Error:', e);
      }
    }, []);
  
    return (
      //todo: handle updating one field at a time/reading so you don't have to do it in one sitting (done, sort of)
      //      edit today's and previous days submissions
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Personal Care: </Text>
          <View style={styles.row}>
              <Button
                  title={"Brushed Teeth (Morning)"}
                  onPress={() => setMorningBrush(!morningBrush)}
                  color={morningBrush ? "green" : "red"}
              />
              <Button
                  title={"Brushed Teeth (Night)"}
                  onPress={() => setNightBrush(!nightBrush)}
                  color={nightBrush ? "green" : "red"}
              />
              <Button
                  title={"Used Mouthwash"}
                  onPress={() => setUsedMouthwash(!usedMouthwash)}
                  color={usedMouthwash ? "green" : "red"}
              />
              <Button
                  title={"Washed Face"}
                  onPress={() => setWashedFace(!washedFace)}
                  color={washedFace ? "green" : "red"}
              />
              <Button
                  title={"Used Exfoliator"}
                  onPress={() => setUsedExfoliator(!usedExfoliator)}
                  color={usedExfoliator ? "green" : "red"}
              />
              <Button
                  title={"Showered"}
                  onPress={() => setShowered(!showered)}
                  color={showered ? "green" : "red"}
              />
              <Button
                  title={"Took Medication"}
                  onPress={() => setTookMedicine(!tookMedicine)}
                  color={tookMedicine ? "green" : "red"}
              />
          </View>
        </View>


        <View>
          <Text style={styles.title}>Workout: </Text>
          <View style={styles.row}>
              <Text>Biking (minutes): </Text>
              <TextInput
                  style={styles.textInput}
                  value={minutesBiked}
                  onChangeText={setMinutesBiked}
                  keyboardType='numeric'
              />
          </View>
          <View style={styles.row}>
              <Text>Situps: </Text>
              <TextInput
                  style={styles.textInput}
                  value={situpsDone}
                  onChangeText={setSitupsDone}
                  keyboardType='numeric'
              />
          </View>
          <View style={styles.row}>
              <Text>Pushups: </Text>
              <TextInput
                  style={styles.textInput}
                  value={pushupsDone}
                  onChangeText={setPushupsDone}
                  keyboardType='numeric'
              />
          </View>
        </View>
        

        <View>
          <Text style={styles.title}>Productivity</Text>
          <View style={styles.row}>
              <Text>Leetcode (minutes): </Text>
              <TextInput
                  style={styles.textInput}
                  value={leetcodeMinutes}
                  onChangeText={setLeetcodeMinutes}
                  keyboardType='numeric'
              />
          </View>
          <View style={styles.row}>
              <Text>Personal Project (minutes): </Text>
              <TextInput
                  style={styles.textInput}
                  value={personalProjectMinutes}
                  onChangeText={setPersonalProjectMinutes}
                  keyboardType='numeric'
              />
          </View>
          <View style={styles.row}>
              <Text>Art (minutes): </Text>
              <TextInput
                  style={styles.textInput}
                  value={artMinutes}
                  onChangeText={setArtMinutes}
                  keyboardType='numeric'
              />
          </View>
          
        </View>
    
        <Button                 
            title={"Submit"}
            onPress={save}
            color="green"/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#eaeaea',
    },
    keys: {
      fontSize: 14,
      color: 'grey',
    },
    title: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      marginVertical: 20,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
    },
  });
// export default function App() {
    
//     const [testKey, setTestKey] = useMMKVString('testKey') 
//     const [testValue, setTestValue] = useMMKVString('testValue')

//     useEffect(() => {
//         const submitButton = () => {
//             setTestKey(testKey)
//             setTestValue(testValue)
//         }
//     })
//     return (
//         <SafeAreaView>
//             <View>
//                 <TextInput
//                     // onChangeText={setTestKey}
//                     value={testKey}
//                 />
//                 <TextInput
//                     // onChangeText={setTestValue}
//                     value={testValue}
//                 />
//                 <Button
//                     title="Submit"
//                     // onPress={useEffect(() => {setTestKey}, [])}
//                     // onPress = {() => submitButton}
//                     onPress = {() => setTestKey}
//                  />
//                 <Text>{testKey} {testValue}</Text>
//             </View>
//         </SafeAreaView>
//     )
// }
// storage.set('test_number1', 'one')
