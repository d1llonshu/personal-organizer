import { useState, useEffect } from 'react';
import { SafeAreaView, View,  Text, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { MMKV, useMMKVObject } from 'react-native-mmkv';
import * as Notifications from 'expo-notifications';


import { Submissions } from '@/constants/FormData';
import { Habit } from "@/constants/habit";
import { styles } from '@/constants/stylesheet';
import { sampleSubmissions, sampleHabits } from '@/constants/sampleData';

export default function Settings(){
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    const [submissions, setSubmissions] = useMMKVObject<Submissions>("submissions");
    const [habitIDCounter, setHabitIDCounter] = useMMKVObject<number>('habitIDCounter');
    const [dailyReminder, setDailyReminder] = useMMKVObject<boolean>('dailyReminder');
    if(dailyReminder == undefined){
        setDailyReminder(false);
    }
    const temp = new Date(Date.now() + 60 * 60 * 1000);
    temp.setMinutes(0);
    temp.setSeconds(0);
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    function createTwoButtonAlert() : boolean{
        let ret = false;
        Alert.alert('Alert Title', 'My Alert Msg', [
            {
              text: 'Cancel',
              onPress: () => {ret = false},
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {ret = true}},
          ]);
        return ret;
    }
    async function requestPermissionsAsync() {
        return await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        });
      }
    async function showScheduled(){
        await Notifications.getAllScheduledNotificationsAsync().then(response => {
            console.log(response);});
        
    }

    return(
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.regularSubtitle}>Submissions JSON: </Text>
                    <TextInput
                        style={styles.textInput}
                        value={JSON.stringify(submissions)}
                    />
                    <Text style={styles.regularSubtitle}>Habits JSON: </Text>
                    <TextInput
                        style={styles.textInput}
                        value={JSON.stringify(habits)}
                    />
                </View>
                <View key="setSampleData" style = {styles.buttonContainer}>
                    <Pressable onPress={() => {
                        Alert.alert("Are you sure you want to override data?", "", [
                            {
                                text: 'Cancel',
                                onPress: () => {},
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => {
                                    setHabits(sampleHabits);
                                    setSubmissions(sampleSubmissions);
                                    setHabitIDCounter(sampleHabits.length);
                                }
                            },
                        ]);
                        }}
                        style={() => [
                            {
                                backgroundColor:  "#4f7942",
                                padding: 5,
                                borderRadius: 4,
                            },
                        ]}>
                        <Text  style={styles.buttonTitle}>SET TO SAMPLE DATA</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        Alert.alert("Are you sure you want to CLEAR data?", "", [
                            {
                                text: 'Cancel',
                                onPress: () => {},
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => {
                                    let temp : Habit[] = [];
                                    setHabits(temp);
                                    let temp2 : Submissions = {};
                                    setSubmissions(temp2);
                                    setHabitIDCounter(0);}
                            },
                        ]);
                            
                        }}
                        style={() => [
                            {
                                backgroundColor: "#CF6679",
                                padding: 5,
                                borderRadius: 4,
                            },
                        ]}>
                        <Text  style={styles.buttonTitle}>CLEAR DATA</Text>
                    </Pressable>
                    
                </View>
                <View key={"notificationTest"}>
                    <Text style={styles.regularSubtitle}>Reminders/Notifications: </Text>
                    <Pressable onPress={() => {
                            console.log("req");
                            requestPermissionsAsync();
                            }}
                            style={() => [
                                {
                                    backgroundColor:  "#4f7942",
                                    padding: 5,
                                    borderRadius: 4,
                                },
                            ]}>
                            <Text  style={styles.buttonTitle}>Request Perms</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            console.log("Reminders: " + !dailyReminder);
                            if(dailyReminder == false){//if reminder is disabled
                                Notifications.scheduleNotificationAsync({
                                    content: {
                                        title: 'Check items off your checklist!',
                                    },
                                    trigger: {
                                        seconds: 60 * 60 * 24,
                                        repeats: true,
                                    },
                                    identifier: "Reminder"
                                });
                                setDailyReminder(true);
                            }
                            else{
                                setDailyReminder(false);
                                showScheduled();
                                Notifications.cancelScheduledNotificationAsync("Reminder");
                            }
                            
                            }}
                            style={() => [
                                {
                                    backgroundColor:dailyReminder? "#CF6679":"#4f7942",
                                    padding: 5,
                                    borderRadius: 4,
                                },
                            ]}>
                            <Text  style={styles.buttonTitle}>{dailyReminder?"Disable Daily Reminder":"Enable Daily Reminder"}</Text>
                        </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

