import { SafeAreaView, View, TextInput, Text, ScrollView, Pressable } from 'react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';

import { progressBarStyles, styles } from '@/constants/stylesheet';
import { Habit } from '@/constants/habit';
import { Submissions } from '@/constants/FormData';
import { calculateStatsForPeriod, generateDifferentDaysKey, generateConsecutiveKeys, habitValueAsInt } from "@/components/helper"

export default function currentWeekSummary(habits: Habit[], submissions: Submissions, todaysKey: string) {
    let sections: JSX.Element[] = [];
    let keys = generateConsecutiveKeys(todaysKey, new Date(todaysKey).getUTCDay());
    console.log(keys);
    sections.push(
        <View key={"WeeklyProgressHeader"}>
            <Text style={styles.homeScreenSubtitle}>Targets for Week of {keys[keys.length-1]}</Text>
        </View>
    );
    let stats = calculateStatsForPeriod(habits, submissions, keys);
    habits.forEach((h) => {
        sections.push(showWeeklyProgress(h, stats[h.keyName][0]));
    })
    return sections
}

function showWeeklyProgress(habit: Habit, value: number){
    let barValue = 0;
    let barColor = "#CF6679";
    if (habit.timeframe === "Daily"){
        barValue = value/(Number(habit.goal)*7);
    }
    else if (habit.timeframe === "Weekly"){
        barValue = value/(Number(habit.goal));
    }

    if(barValue >= 0.5 && barValue < 0.8){
        barColor = "#feff5c";
    }
    else if (barValue >= 0.8 && barValue < 1){
        barColor = "#58b947";
    }
    else if (barValue >= 1){
        barColor = "green";
    }
    if (barValue >= 1){
        barValue = 1;
    }

    return(
        <View key={habit.keyName+"WeeklyProgress"}>
            <View style={styles.row}>
                <Text style={progressBarStyles.progressBarTitle}>{habit.prettyPrint}: </Text>
                <Text style={progressBarStyles.progressBarSubtitle}>{value}/{(habit.timeframe === "Daily")? Number(habit.goal)*7 : habit.goal} {(habit.dataType == "boolean")?"day":"minute"}{(habit.goal==="1")? "":"s"}</Text>
            </View>
            <ProgressBar style={progressBarStyles.progressBarStyle} fillStyle={progressBarStyles.progressBarfillStyle}  
                progress={barValue} color={barColor} />
            
        </View>
    );
}




