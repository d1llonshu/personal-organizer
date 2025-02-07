import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Pressable, Alert, Button, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { Link, usePathname, useRouter } from 'expo-router';

import { Habit, dataTypes, timeframes, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles, calendarTheme, reminderStyles } from "@/constants/stylesheet"
import DropdownComponent from '@/components/dropdownComponent';
import { CustomButton } from "@/components/customButton";
import { Reminder } from "@/constants/reminder";


import * as Notifications from 'expo-notifications';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker'



export default function newReminderForm() {
    const router = useRouter();
    const [reminderIDCount, setReminderIDCount] = useMMKVObject<number>('reminderIDCount');
    if(reminderIDCount == undefined){
        setReminderIDCount(0);
    }
    const [reminderArray, setReminderArray] = useMMKVObject<Reminder[]>('reminderArray');
    if(reminderArray == undefined){
        setReminderArray([]);
    }
    //const [keyName, setkeyName] = useState<string>('exampleHabit');
    const [reminderTitle, setReminderTitle] = useState<string>('');
    const [reminderText, setReminderText] = useState<string>('');
    let today = new Date();
    let todayString: string = 
        today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
    const [triggerDate, setTriggerDate] = useState<string>(todayString);
    const [triggerTime, setTriggerTime] = useState<string>('');
    const [repeats, setRepeats] = useState<string>('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const onDayPress = ((day : {dateString:string, day:string, month:number, timestamp:number, year:number}) => {
        setTriggerDate(day.dateString);
    });
    


    const save = () => {
        // needs field validation
        console.log('Saving...');
        let created = new Date();
        let timeUntil = (date.getTime() - created.getTime())/1000;//time until in seconds
        if(passesFormValidation(timeUntil, reminderTitle)){
            let reminder : Reminder = {
                notificationID: "Custom Reminder " + reminderIDCount,
                creationTime: created,
                triggerTime: date,
                timeUntilTrigger: timeUntil,
                repeats: false,
                repeatDetails: {weekday:0, hour:0, second:0},
            }
            console.log(created);
            Notifications.scheduleNotificationAsync({
                content: {
                    title: reminderTitle,
                },
                trigger: {
                    seconds: timeUntil,
                    repeats: false,
                },
                identifier: "Custom Reminder " + reminderIDCount
            });  
            let c = reminderIDCount?reminderIDCount:0;
            setReminderIDCount(c+1);
            let r = reminderArray?reminderArray:[];
            r.push(reminder);
            setReminderArray(r);
            console.log(timeUntil);
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
            
            <View key={"nameInput"}style={styles.row}>
              <Text style={reminderStyles.reminderFormSubtitle}>Message: </Text>
              <TextInput
                  style={reminderStyles.textInput}
                  placeholder='Pick up laundry'
                  placeholderTextColor="gray" 
                  value={reminderTitle}    
                  onChangeText={setReminderTitle}
              />
            </View>
            <View key={"datePickerTest"} style={styles.row}>
                <Text style={reminderStyles.reminderFormSubtitleMoreMargin}>Time:</Text>
                <Text style={reminderStyles.reminderFormRegularText}>{date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)} {((date.getHours() + 24) % 12 || 12) + ":" + ("0" + date.getMinutes()).slice(-2) + ((date.getHours()<=12)?" AM":" PM")}</Text>
                {/* <DatePicker date={date} onDateChange={setDate} 
                dividerColor='#E1D9D1'
                /> */}
                <View style = {styles.buttonContainer}>
                    <Pressable
                        android_ripple={{color : 'white'}}
                        onPress={()=>{
                            setOpen(true)
                        }}
                        style={() => [
                            {
                                flex: 0.1,
                                backgroundColor: "#4f7942",
                                padding: 5,
                                borderRadius: 4,
                            },
                        ]}>
                        <Text style={styles.buttonTitle}>{"Change"}</Text>
                    </Pressable>
                </View>
                <DatePicker  
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false);
                        setDate(date);
                        console.log(date);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }} />
            </View>


            <View key={"submitButton"}>
              <CustomButton               
                title={"Create"}
                disabled={false}
                onPress={()=>{
                  if(save()){
                    router.back();
                  }
                }}
                color = "#4f7942"
              />
            </View>
            </ScrollView>
        </SafeAreaView>
    ); 
}

function passesFormValidation(timeUntil: number, reminderID: string) : Boolean {
    if(timeUntil <= 0){
        return false;
    }
    
    return true
}