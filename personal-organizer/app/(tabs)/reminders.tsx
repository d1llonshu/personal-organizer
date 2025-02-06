import { SafeAreaView, View,  Text, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV, useMMKVObject } from 'react-native-mmkv';
import Ionicons from '@expo/vector-icons/Ionicons';

import { streakData } from '@/constants/streaks';
import { styles, backgroundColor, surfaceBackgroundColor } from '@/constants/stylesheet';

import { Submissions } from '@/constants/FormData';
import { Habit } from "@/constants/habit";
import printOngoingStreaks from '@/components/updateStreaksNew';

import createSummary from '@/components/habitProgress';
import { Surface } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

export default function RemindersPage() {
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

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
          <ScrollView style={styles.container}>
            <View key="body">
                <Surface style={styles.homeScreenSurface} elevation={1}>
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
                </Surface>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}