import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { Link, usePathname, useRouter } from 'expo-router';
import { Surface } from 'react-native-paper';


// import { Habit, dataTypes, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet";
import { Submissions } from '@/constants/FormData';

export default function daysOverview() {
    const [days, setDays] = useMMKVObject<Submissions>('submissions');
    const [pageSections, setPageSections] = useState<JSX.Element[]>([]);
    const router = useRouter();
    useEffect(() => {
        let sections: JSX.Element[] = [];
        let keys = days ? Object.keys(days) : [];

        let today = new Date();
        let todaysKey: string = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate());

        keys = keys.reverse();
        keys = keys.filter(key => key !== todaysKey);

        if (days){
            sections.push(
                <View key="header" style={styles.dayPageContainer}>
                    <Text style={styles.dayPageTitle}>History:</Text>
                </View>
            );
            keys.map((d) => {
                sections.push(
                    <View key={d} style={styles.dayPageContainer}>
                        <Link href={{pathname:"/day/[day]", params: {day: d}}}>
                                <Text style={styles.dayPageHyperlink}>{d}</Text>
                        </Link>
                    </View>
                    // <View key={h.keyName}>
                    //     <TouchableOpacity onPress={() => router.push(`/days[habit]?habit=${h.keyName}`)}>
                    //     <Text style={styles.regularText}>{h.prettyPrint}</Text>
                    //     </TouchableOpacity>
                    // </View>
                );
            });
        }
        setPageSections(sections);
    }, [days]);
    
    return(
        <SafeAreaView style = {styles.safeAreaContainer}>
            <ScrollView>
                <Surface style={styles.homeScreenSurface} elevation={1}>
                    {pageSections}
                </Surface>
            </ScrollView>
      </SafeAreaView>
    )
}