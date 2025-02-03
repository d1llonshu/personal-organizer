import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVObject} from 'react-native-mmkv';
import { Link, useRouter } from 'expo-router';
import { Surface } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

// import { Habit, dataTypes, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, buttonColorTrue } from "@/constants/stylesheet";
import { Submissions } from '@/constants/FormData';

export default function daysOverview() {
    const [days, setDays] = useMMKVObject<Submissions>('submissions');
    const [pageSections, setPageSections] = useState<JSX.Element[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
    let sections: JSX.Element[] = [];
    let keys = days ? Object.keys(days) : [];

    let today = new Date();
    let todaysKey: string = 
        today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);

    // keys = keys.filter(key => key !== todaysKey);
    const router = useRouter();
    const onDayPress = useCallback((day : {dateString:string, day:string, month:number, timestamp:number, year:number}) => {
        // Navigate to the new page with the selected date
        router.push({ pathname: '/(tabs)/day/[day]', params: { day: day.dateString } });
      }, [router]);
    
    const formExists: { [key: string]: {} } = {};
    for(let i = 0; i < keys.length; i++){
        formExists[keys[i]] = {disabled: false, marked: true, dotColor:"green"};
    }
    keys = keys.reverse();
    const calendar = <Calendar 
        disableAllTouchEventsForDisabledDays
        enableSwipeMonths
        disabledByDefault
        minDate={keys[keys.length-1]} 
        onDayPress={onDayPress}
        markingType={'period'}
        markedDates={formExists}
 
    />

    
    return(
        <SafeAreaView style = {styles.safeAreaContainer}>
            <ScrollView>
                <Surface style={styles.homeScreenSurface} elevation={1}>
                    {pageSections}
                    {calendar}
                    
                </Surface>
            </ScrollView>
      </SafeAreaView>
    )
}