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
    const [timePickerDate, setTimePickerDate] = useState(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const [timePickerOpen, setTimePickerOpen] = useState<boolean>(false);
    const [weekday, setWeekday] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');
    const [dayOfMonth, setDayOfMonth] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [repeat, setRepeat] = useState<string>('');
    const [AMorPM, setAMorPM] = useState<string>('AM');
    const [sections, setSections] = useState<JSX.Element[]>([]);


    const onDayPress = ((day : {dateString:string, day:string, month:number, timestamp:number, year:number}) => {
        setTriggerDate(day.dateString);
    });
    const reminderRepeat = [
        { label: 'Once (Does not repeat)', value: 'Once' },
        { label: 'Daily', value: 'Daily' },
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Yearly', value: 'Yearly' },
    ]
    const weekdays = [
        { label: 'Sunday', value: '1' },
        { label: 'Monday', value: '2' },
        { label: 'Tuesday', value: '3' },
        { label: 'Wednesday', value: '4' },
        { label: 'Thursday', value: '5' },
        { label: 'Friday', value: '6' },
        { label: 'Saturday', value: '7' },
    ]
    const months = [
        { label: 'January', value: '0' },
        { label: 'February', value: '1' },
        { label: 'March', value: '2' },
        { label: 'April', value: '3' },
        { label: 'May', value: '4' },
        { label: 'June', value: '5' },
        { label: 'July', value: '6' },
        { label: 'August', value: '7' },
        { label: 'September', value: '8' },
        { label: 'October', value: '9' },
        { label: 'Novemeber', value: '10' },
        { label: 'December', value: '11' },
    ]
    const AMPM = [
        { label: 'AM', value: 'AM' },
        { label: 'PM', value: 'PM' },
    ]
    
    const datePickerOneTime =  
        (<View key={"datePickerOneTime"} style={styles.row}>
        <Text style={reminderStyles.reminderFormSubtitleMoreMargin}>Time:</Text>
        <Text style={reminderStyles.reminderFormRegularText}>{date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)} {((date.getHours() + 24) % 12 || 12) + ":" + ("0" + date.getMinutes()).slice(-2) + ((date.getHours()<=12)?" AM":" PM")}</Text>
        {/* <DatePicker date={date} onDateChange={setDate} 
        dividerColor='#E1D9D1'
        /> */}
        <View style = {styles.buttonContainer}>
            <Pressable
                android_ripple={{color : 'white'}}
                onPress={()=>{
                    setOpen(true);
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
        </View>);
    const weekdaySection = (
        <View key={"weekdaySection"} style={styles.row}>
            <Text style={reminderStyles.reminderFormSubtitle}>Day of Week:</Text>
            <Dropdown
                style={reminderStyles.dropdown}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                inputSearchStyle={dropdownStyles.inputSearchStyle}
                iconStyle={dropdownStyles.iconStyle}
                data={weekdays}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder=""
                value={weekday}
                onChange={item => {
                    setWeekday(item.value);
                }}
            />
        </View>
    );
    const monthSection = (
        <View key={"monthSection"} style={styles.row}>
            <Text style={reminderStyles.reminderFormSubtitle}>Month:</Text>
            <Dropdown
                style={reminderStyles.dropdown}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                inputSearchStyle={dropdownStyles.inputSearchStyle}
                iconStyle={dropdownStyles.iconStyle}
                data={months}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder=""
                value={month}
                onChange={item => {
                    setMonth(item.value);
                }}
            />
        </View>
    );
    const dayOfMonthSection = (
        <View key={"dayOfMonthSection"} style={styles.row}>
            <Text style={reminderStyles.reminderFormSubtitle}>Day of Month:</Text>
            <TextInput
                style={reminderStyles.timeInput}
                placeholder='15'
                placeholderTextColor="gray"
                keyboardType='numeric'
                value={dayOfMonth}    
                onChangeText={setDayOfMonth}
            />
        </View>
    );
    const timeOfDaySection = (
        <View key={"timeOfDaySection"} style={styles.row}>
            <Text style={reminderStyles.reminderFormSubtitle}>Time: </Text>
            <TextInput
                style={reminderStyles.timeInput}
                placeholder='Hour'
                placeholderTextColor="gray" 
                keyboardType='numeric'
                value={hour}    
                onChangeText={setHour}
            />
            <Text style={reminderStyles.colon}>:</Text>
            <TextInput
                style={reminderStyles.timeInput}
                placeholder='Minute'
                placeholderTextColor="gray" 
                keyboardType='numeric'
                value={minute}    
                onChangeText={setMinute}
            />
            <Dropdown
                style={reminderStyles.AMPMDropdown}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                inputSearchStyle={dropdownStyles.inputSearchStyle}
                iconStyle={dropdownStyles.iconStyle}
                data={AMPM}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={AMorPM}
                onChange={item => {
                    setAMorPM(item.value);
                }}
            />
        </View>
    );


    const save = () => {
        // needs field validation
        console.log('Saving...');
        let created = new Date();
        let timeUntil = (date.getTime() - created.getTime())/1000;//time until in seconds
        if(passesFormValidation(timeUntil, reminderTitle, repeat, Number(month), Number(weekday), Number(dayOfMonth), Number(hour), Number(minute))){
            let reminder : Reminder = {
                notificationID: "Custom Reminder " + reminderIDCount,
                creationTime: created,
                triggerTime: date,
                timeUntilTrigger: timeUntil,
                repeats: repeat,
                repeatDetails: {month: Number(month), dayOfMonth: Number(month), weekday:Number(weekday), hour:Number(hour), minute:Number(minute)},
            }
            let notifTrigger = {}
            if(repeat === "Once"){
                notifTrigger = {
                    seconds: timeUntil,
                    repeats: false,
                }
            }
            else if (repeat === "Daily"){
                notifTrigger = {
                    hour: Number(hour),
                    minute: (AMorPM === "AM")?Number(minute):(Number(minute)+12),
                    repeats: true,
                }
            }
            else if(repeat === "Weekly"){
                notifTrigger = {
                    weekday: Number(weekday),
                    hour: Number(hour),
                    minute: (AMorPM === "AM")?Number(minute):(Number(minute)+12),
                    repeats: true,
                }
            }
            else if(repeat === "Monthly"){
                notifTrigger = {
                    day: Number(dayOfMonth),
                    hour: Number(hour),
                    minute: (AMorPM === "AM")?Number(minute):(Number(minute)+12),
                    repeats: true,
                }
            }
            else{
                notifTrigger = {
                    month: Number(month),
                    day: Number(dayOfMonth),
                    hour: Number(hour),
                    minute: (AMorPM === "AM")?Number(minute):(Number(minute)+12),
                    repeats: true,
                }
            }
            console.log(created);
            Notifications.scheduleNotificationAsync({
                content: {
                    title: reminderTitle,
                },
                trigger: notifTrigger,
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
    useEffect(() => {
        let temp = []

        if(repeat === "Weekly"){
            temp.push(weekdaySection);
        }
        else if(repeat === "Monthly"){
            temp.push(dayOfMonthSection);
        }
        else if(repeat === "Yearly"){
            temp.push(monthSection);
            temp.push(dayOfMonthSection);
        }

        if(repeat === "Once"){
            temp.push(datePickerOneTime);
        }
        else if(repeat !== ""){
            temp.push(timeOfDaySection);
        }
        setSections(temp);
    }, [repeat, hour, minute, dayOfMonth])

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
                <View key = {"body"}>
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
                    <View key={"repeatDropdown"} style={styles.row}>
                        <Text style={reminderStyles.reminderFormSubtitle}>Repeats:</Text>
                        <Dropdown
                            style={reminderStyles.dropdown}
                            placeholderStyle={dropdownStyles.placeholderStyle}
                            selectedTextStyle={dropdownStyles.selectedTextStyle}
                            inputSearchStyle={dropdownStyles.inputSearchStyle}
                            iconStyle={dropdownStyles.iconStyle}
                            data={reminderRepeat}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder=""
                            value={repeat}
                            onChange={item => {
                                setRepeat(item.value);
                            }}
                        />
                    </View>
                    {sections}
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
                </View>
            </ScrollView>
        </SafeAreaView>
    ); 
}


function passesFormValidation(timeUntil: number, reminderID: string, repeatType: string, month: number, dayOfWeek: number, dayOfMonth: number, hour: number, minute: number) : Boolean {
    const acceptableMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const acceptableWeekDays = [1, 2, 3, 4, 5, 6, 7];
    if(repeatType === ""){
        return false;
    }
    if(repeatType === "Once" && timeUntil <= 0){
        return false;
    }
    if(hour > 12 || hour < 0 || minute > 59 || minute < 0){
        return false;
    }
    if(repeatType === "Yearly" || repeatType == "Monthly"){
        if(dayOfMonth < 0 || dayOfMonth > 31){
            return false;
        }
        if(repeatType === "Yearly"){
            if(acceptableMonths.includes(month) === false){
                return false;
            }
        }
    }
    if(repeatType === "Weekly"){
        if(acceptableWeekDays.includes(dayOfWeek) === false){
            return false;
        }
    }

    return true
}

