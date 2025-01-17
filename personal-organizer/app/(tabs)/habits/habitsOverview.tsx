import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { Link, usePathname, useRouter } from 'expo-router';
import { Surface } from 'react-native-paper';

import { Habit, dataTypes, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet"

export default function habitsPage() {
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    const [pageSections, setPageSections] = useState<JSX.Element[]>([]);
    const router = useRouter();
    useEffect(() => {
        let sections: JSX.Element[] = [];
        if (habits){
            sections.push(
                <View key="header" style={styles.dayPageContainer}>
                    <Text style={styles.dayPageTitle}>Habits:</Text>
                </View>
            );
            habits.map((h) => {
                sections.push(
                    <View key={h.prettyPrint} style={styles.dayPageContainer}>
                        <Link href={{pathname:"/habits/[habit]", params: {habit: h.keyName}}}>
                                <Text style={styles.dayPageHyperlink}>{h.prettyPrint}</Text>
                        </Link>
                    </View>
                    // <View key={h.keyName}>
                    //     <TouchableOpacity onPress={() => router.push(`/habits[habit]?habit=${h.keyName}`)}>
                    //     <Text style={styles.regularText}>{h.prettyPrint}</Text>
                    //     </TouchableOpacity>
                    // </View>
                );
            });
        }
        setPageSections(sections);
    }, [habits]);
    
    return(
        <SafeAreaView style = {styles.safeAreaContainer}>
            <ScrollView>
                <Surface style={styles.homeScreenSurface} elevation={1}>
                    {pageSections}
                    <View key="newHabitButton" style = {styles.buttonContainer}>
                        <Pressable onPress={() => router.push("/habits/newHabitForm")}
                            style={() => [
                                {
                                    backgroundColor:  "#4f7942",
                                    padding: 5,
                                    marginHorizontal: 5,
                                    borderRadius: 4,
                                },
                            ]}>
                            <Text  style={styles.buttonTitle}>New Habit</Text>
                        </Pressable >
                    </View>
                </Surface>
            </ScrollView>
      </SafeAreaView>
    )
}