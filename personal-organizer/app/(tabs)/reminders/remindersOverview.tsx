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
    const [sections, setSections] = useState<JSX.Element[]>([]);
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
    
    async function checkScheduled(){
        let activeReminders : string[] = [];
        let scheduled = await Notifications.getAllScheduledNotificationsAsync().then(response => {
            console.log(JSON.stringify(response));
            // response.forEach((r) => {
            //     activeReminders.push(r.identifier);
            // });
            return response});
        scheduled.forEach((r) => {
            activeReminders.push(r.identifier);
        })
        console.log(reminderArray);
        let newReminderArray : Reminder[] = [];
        let newSections : JSX.Element[] = [];
        if(reminderArray){
            for(let i = 0; i < reminderArray.length; i++){
                if(activeReminders.includes(reminderArray[i].notificationID)){
                    console.log(reminderArray[i].notificationID);
                    newSections.push(
                        <View key={reminderArray[i].notificationID} style={styles.row}>
                            <Link href={{pathname:"/reminders/[reminder]", params: {reminder: reminderArray[i].notificationID}}}>
                                    <Text style={styles.dayPageHyperlink}>{reminderArray[i].title}</Text>
                            </Link>
                            <Text style={styles.regularSubtitle}>{getKeyReminderInfo(reminderArray[i])}</Text>
                        </View>
                    );
                }
                // let temp = new Date(reminderArray[i].triggerTime)
                // if(temp.getTime() > now.getTime() && reminderArray[i].repeats == "Once"){
                //     (<Text style={styles.regularSubtitle}></Text>)
                //     newReminderArray.push(reminderArray[i]);
                // }
                // else if(reminderArray[i].repeats != "Once"){
                //     newReminderArray.push(reminderArray[i]);
                // }
            } 
        }
        console.log(newReminderArray);
        setSections(newSections);
        // setScheduledNotifications([<Text style={styles.regularSubtitle}>{scheduled}</Text>])
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
                    <View key={"remindersList"}>
                        <Text style={styles.title}>Active Reminders</Text>
                        {sections}
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
                                        setReminderArray([]);
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
function getKeyReminderInfo(r: Reminder) : string{
    let returnString = "";
    const weekdayStrings = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if(r.repeats !== "Once"){
        if(r.repeats === "Yearly"){
            returnString = returnString + "Yearly on " + (r.repeatDetails.month+1) + "/" + r.repeatDetails.dayOfMonth;
        }
        else if(r.repeats === "Monthly"){
            returnString = returnString + " on the " + r.repeatDetails.dayOfMonth
            if(r.repeatDetails.dayOfMonth % 10 === 1){
                returnString = returnString + "st";
            }
            else if(r.repeatDetails.dayOfMonth % 10 === 2){
                returnString = returnString + "nd";
            }
            else if(r.repeatDetails.dayOfMonth % 10 === 3){
                returnString = returnString + "rd";
            }
            else{
                returnString = returnString + "th";
            }
        }
        else if(r.repeats === "Weekly"){
            returnString = weekdayStrings[r.repeatDetails.weekday-1] + "s";
        }
        else if(r.repeats === "Daily"){
            returnString = r.repeats;
        }
        returnString = returnString + " at " + ((r.repeatDetails.hour > 12)?r.repeatDetails.hour-12:r.repeatDetails.hour)
                        + ":" + r.repeatDetails.minute + " " + ((r.repeatDetails.hour >= 12)?"PM":"AM");
        
        return returnString;
    }
    else{
        const date = r.triggerTime;
        returnString = "Triggers on " + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
        returnString = returnString + " at " + ((date.getHours() > 12)?date.getHours()-12:date.getHours()) + ":" 
                        + date.getMinutes() + ((date.getHours() >= 12)?"PM":"AM");
        
        return returnString;
    }
}