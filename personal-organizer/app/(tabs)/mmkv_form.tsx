import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text } from 'react-native';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';
// import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { storage } from "../../constants/storage"
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

// const storage = new MMKV();
type formData = {
    morningBrush: boolean;
    nightBrush: boolean;
    usedMouthwash: boolean;
    washedFace: boolean;
    usedExfoliator: boolean;

    minutesBiked: number;
    situpsDone: number;
    pushupsDone: number;

    minutesWorked: number;
}

export default function App() {
    const dateFormat: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const [text, setText] = useState<string>('');
    const [key, setKey] = useState<string>('');
    const [keys, setKeys] = useState<string[]>([]);

    //Personal Care
    const [morningBrush, setMorningBrush] = useState<boolean>(false);
    const [nightBrush, setNightBrush] = useState<boolean>(false);
    const [usedMouthwash, setUsedMouthwash] = useState<boolean>(false);
    const [washedFace, setWashedFace] = useState<boolean>(false);
    const [usedExfoliator, setUsedExfoliator] = useState<boolean>(false);

    //Workout
    const [minutesBiked, setMinutesBiked] = useState<string>('0');
    const [situpsDone, setSitupsDone] = useState<string>('0');
    const [pushupsDone, setPushupsDone] = useState<string>('0');

    //Productivity
    const [minutesWorked, setMinutesWorked] = useState<string>('0');

    let today = new Date().toLocaleDateString(undefined, dateFormat);
    const [data, setData] = useMMKVObject<formData>(today)


    // const [example, setExample] = useMMKVString('yeeeet');
  
    // useMMKVListener((k) => {
    //   console.log(`${k} changed!`);
    // });
  
    const save = useCallback(() => {
      if (key == null) {
        Alert.alert('Empty key!', 'Enter a key first.');
        return;
      }
      try {
        console.log('Saving...');
        let submission : formData = {
            morningBrush: morningBrush,
            nightBrush: nightBrush,
            usedMouthwash: usedMouthwash,
            washedFace: washedFace,
            usedExfoliator: usedExfoliator,
            minutesBiked: parseInt(minutesBiked),
            situpsDone: parseInt(situpsDone),
            pushupsDone: parseInt(pushupsDone),
            minutesWorked: parseInt(minutesWorked)   
        }
        setData(submission);
        console.log(data?.morningBrush);
      } catch (e) {
        console.error('Error:', e);
        Alert.alert('Failed to set value for key "test"!', JSON.stringify(e));
      }
    }, [key, text]);
    
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
  
    // useEffect(() => {
    //   console.log(`Value of useMMKVString: ${example}`);
    //   const interval = setInterval(() => {
    //     setExample((val) => {
    //       return val === 'yeeeet' ? undefined : 'yeeeet';
    //     });
    //   }, 1000);
    //   return () => {
    //     clearInterval(interval);
    //   };
    // }, [example, setExample]);
  
    return (
      <View style={styles.container}>
        <Text style={styles.keys}>Available Keys: {keys.join(', ')}</Text>
        <View style={styles.row}>
          <Text style={styles.title}>Key:</Text>
          <TextInput
            placeholder="Key"
            style={styles.textInput}
            value={key}
            onChangeText={setKey}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Value:</Text>
          <TextInput
            placeholder="Value"
            style={styles.textInput}
            value={text}
            onChangeText={setText}
          />
        </View>

        <Text>Personal Care: </Text>
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
        </View>

        <Text>Workout: </Text>
        <View style={styles.row}>
            <Text>Situps: </Text>
            <TextInput
                placeholder="0"
                style={styles.textInput}
                value={situpsDone}
                onChangeText={setSitupsDone}
                keyboardType='numeric'
            />
        </View>
        <View style={styles.row}>
            <Text>Biking (minutes): </Text>
            <TextInput
                placeholder="0"
                style={styles.textInput}
                value={minutesBiked}
                onChangeText={setMinutesBiked}
                keyboardType='numeric'
            />
        </View>

        <View style={styles.row}>
            <Text>Time Worked (minutes): </Text>
            <TextInput
                placeholder="0"
                style={styles.textInput}
                value={minutesWorked}
                onChangeText={setMinutesWorked}
            />
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
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
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
