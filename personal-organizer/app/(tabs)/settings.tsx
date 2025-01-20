import { SafeAreaView, View,  Text, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { MMKV, useMMKVObject } from 'react-native-mmkv';

import { Submissions } from '@/constants/FormData';
import { Habit } from "@/constants/habit";
import { styles } from '@/constants/stylesheet';
import { sampleSubmissions, sampleHabits } from '@/constants/sampleData';

export default function Settings(){
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    const [submissions, setSubmissions] = useMMKVObject<Submissions>("submissions");
    const [habitIDCounter, setHabitIDCounter] = useMMKVObject<number>('habitIDCounter');
    function createTwoButtonAlert() : boolean{
        let ret = false;
        Alert.alert('Alert Title', 'My Alert Msg', [
            {
              text: 'Cancel',
              onPress: () => {ret = false},
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {ret = true}},
          ]);
        return ret;
    }
        
    return(
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.regularSubtitle}>Submissions JSON: </Text>
                    <TextInput
                        style={styles.textInput}
                        value={JSON.stringify(submissions)}
                    />
                    <Text style={styles.regularSubtitle}>Habits JSON: </Text>
                    <TextInput
                        style={styles.textInput}
                        value={JSON.stringify(habits)}
                    />
                </View>
                <View key="setSampleData" style = {styles.buttonContainer}>
                    <Pressable onPress={() => {
                        Alert.alert("Are you sure you want to override data?", "", [
                            {
                                text: 'Cancel',
                                onPress: () => {},
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => {
                                    setHabits(sampleHabits);
                                    setSubmissions(sampleSubmissions);}
                            },
                        ]);
                        }}
                        style={() => [
                            {
                                backgroundColor:  "#4f7942",
                                padding: 5,
                                borderRadius: 4,
                            },
                        ]}>
                        <Text  style={styles.buttonTitle}>SET TO SAMPLE DATA</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        Alert.alert("Are you sure you want to CLEAR data?", "", [
                            {
                                text: 'Cancel',
                                onPress: () => {},
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => {
                                    let temp : Habit[] = [];
                                    setHabits(temp);
                                    let temp2 : Submissions = {};
                                    setSubmissions(temp2);
                                    setHabitIDCounter(0);}
                            },
                        ]);
                            
                        }}
                        style={() => [
                            {
                                backgroundColor: "#CF6679",
                                padding: 5,
                                borderRadius: 4,
                            },
                        ]}>
                        <Text  style={styles.buttonTitle}>CLEAR DATA</Text>
                    </Pressable>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}