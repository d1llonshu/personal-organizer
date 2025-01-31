import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVObject} from 'react-native-mmkv';
import { Link, useRouter } from 'expo-router';
import { Surface } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

// import { Habit, dataTypes, categories, keyPrettyPrint } from "@/constants/habit"
import { styles } from "@/constants/stylesheet";
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

    keys = keys.reverse();
    keys = keys.filter(key => key !== todaysKey);
    const router = useRouter();
    const onDayPress = useCallback((day : {dateString:string, day:string, month:number, timestamp:number, year:number}) => {
        // Navigate to the new page with the selected date
        router.push({ pathname: '/(tabs)/day/[day]', params: { day: day.dateString } });
      }, [router]);
    
    const formExists = {};
    keys.forEach((key) => {
        formExists[key] = {disabled: false};
    })
    console.log(formExists);
    const calendar = <Calendar 
        disableAllTouchEventsForDisabledDays
        enableSwipeMonths
        disabledByDefault
        minDate={keys[keys.length-1]} 
        onDayPress={onDayPress}
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