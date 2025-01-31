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
        // if(i == 0){
            
        // }
        // else{
        //     console.log((new Date(keys[i-1]).getTime()) - (new Date(keys[i]).getTime()))
        //     if((new Date(keys[i-1]).getTime()) - (new Date(keys[i]).getTime()) == -86400000){
        //         formExists[keys[i]] = {disabled: false, marked:};
        //     }
        //     else{
        //         formExists[keys[i-1]] = {disabled: false, endingDay: true, color: 'green'};
        //         formExists[keys[i]] = {disabled: false, startingDay: true, color: 'green'};
        //     } 
        // }
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

    // const onDayPress = useCallback((day) => {
    //     console.log(day);
    //     router.push({pathname:"/day/[day]", params: {day: day.dateString}});
    //     }, [router]);
    // useEffect(() => {

    //     if (days){

    //         sections.push(
    //             <View key="header" style={styles.dayPageContainer}>
    //                 <Text style={styles.dayPageTitle}>History:</Text>
                    
    //             </View>
    //         );
    //         keys.map((d) => {
    //             sections.push(
    //                 <View key={d} style={styles.dayPageContainer}>
    //                     <Link href={{pathname:"/day/[day]", params: {day: d}}}>
    //                             <Text style={styles.dayPageHyperlink}>{d}</Text>
    //                     </Link>
    //                 </View>
    //                 // <View key={h.keyName}>
    //                 //     <TouchableOpacity onPress={() => router.push(`/days[habit]?habit=${h.keyName}`)}>
    //                 //     <Text style={styles.regularText}>{h.prettyPrint}</Text>
    //                 //     </TouchableOpacity>
    //                 // </View>
    //             );
    //         });
    //     }
    //     setPageSections(sections);
    // }, [days]);
    
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