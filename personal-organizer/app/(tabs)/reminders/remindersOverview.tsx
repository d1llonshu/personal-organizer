import { SafeAreaView, View,  Text, ScrollView, Pressable, Alert, TouchableHighlight } from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV, useMMKVObject } from 'react-native-mmkv';
import Ionicons from '@expo/vector-icons/Ionicons';

import { streakData } from '@/constants/streaks';
import { styles, backgroundColor, surfaceBackgroundColor } from '@/constants/stylesheet';

import { Submissions } from '@/constants/FormData';
import { Habit } from "@/constants/habit";
import { Reminder } from "@/constants/reminder";
import printOngoingStreaks from '@/components/updateStreaksNew';

import createSummary from '@/components/habitProgress';
import { Surface } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { Link, useRouter } from 'expo-router';

export default function RemindersPage() {
    const router = useRouter();
    const [scheduledNotifications, setScheduledNotifications] = useState<JSX.Element[]>([]);
    const [dailyReminder, setDailyReminder] = useMMKVObject<boolean>('dailyReminder');
    if(dailyReminder == undefined){
        setDailyReminder(false);
    }
    const [reminderArray, setReminderArray] = useMMKVObject<Reminder[]>('reminderArray');
    if(reminderArray == undefined){
        setReminderArray([]);
    }
    const [reminderIDCount, setReminderIDCount] = useMMKVObject<number>('reminderIDCount');
    if(reminderIDCount == undefined){
        setReminderIDCount(0);
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
     async function requestPermissionsAsync() {
            return await Notifications.requestPermissionsAsync({
              ios: {
                allowAlert: true,
                allowBadge: true,
                allowSound: true,
              },
            });
          }
    async function checkScheduled(){
        let scheduled = await Notifications.getAllScheduledNotificationsAsync().then(response => {
            console.log(response);
            return JSON.stringify(response)});
        let newReminderArray : Reminder[] = [];
        let now = new Date();
        if(reminderArray){
            for(let i = 0; i < reminderArray.length; i++){
                let temp = new Date(reminderArray[i].triggerTime)
                if(temp.getTime() > now.getTime() && reminderArray[i].repeats == "Once"){
                    newReminderArray.push(reminderArray[i]);
                }
                else if(reminderArray[i].repeats != "Once"){
                    newReminderArray.push(reminderArray[i]);
                }
            } 
        }
        console.log(newReminderArray);
        
        setScheduledNotifications([<Text style={styles.regularSubtitle}>{scheduled}</Text>])
        return test;
    }
    useEffect(()=>{
        checkScheduled();
    }, [])
    useEffect(()=>{
        checkScheduled();
    }, [reminderArray])
 
    // showScheduled();
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
          <ScrollView style={styles.container}>
            <View key="body">
                <Surface style={styles.homeScreenSurface} elevation={1}>
                <View key={"notificationTest"}>
                    <Text style={styles.regularSubtitle}> {scheduledNotifications}</Text>
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
                                    identifier: "Checklist Reminder"
                                });
                                setDailyReminder(true);
                            }
                            else{
                                setDailyReminder(false);
                                Notifications.cancelScheduledNotificationAsync("Checklist Reminder");
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
                    <View key="newHabitButton" style = {styles.buttonContainer}>
                        <Pressable onPress={() => router.push("/reminders/newReminderForm")}
                            style={() => [
                                {
                                    backgroundColor:  "#4f7942",
                                    padding: 5,
                                    marginHorizontal: 5,
                                    borderRadius: 4,
                                },
                            ]}>
                            <Text  style={styles.buttonTitle}>New Reminder</Text>
                        </Pressable >
                    </View>
                    <View key="deleteRemindersButton" style = {styles.buttonContainer}>
                        <Pressable onPress={() => {
                            Alert.alert("Delete all reminders?", "", [
                                {
                                    text: 'Cancel',
                                    onPress: () => {},
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK', onPress: () => {
                                        // Notifications.cancelScheduledNotificationAsync("Checklist Reminder");
                                        for(let i = 0; i < (reminderIDCount?reminderIDCount:0); i++){
                                            Notifications.cancelScheduledNotificationAsync("Custom Reminder " + i);
                                        }
                                        setReminderIDCount(0);
                                    }
                                },
                            ]);
                            
                            }}
                            style={() => [
                                {
                                    backgroundColor:  "#CF6679",
                                    padding: 5,
                                    marginHorizontal: 5,
                                    borderRadius: 4,
                                },
                            ]}>
                            <Text  style={styles.buttonTitle}>Delete Reminders</Text>
                        </Pressable>
                    </View>
                </Surface>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}