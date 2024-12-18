
import { SafeAreaView, View, TextInput, Text, ScrollView, Image } from 'react-native';

import { styles } from '@/constants/stylesheet'
import { streakData } from '@/constants/streaks';
import { formKeysMinusDatePretty } from '@/constants/formData';
import { CustomButton } from "@/components/customButton"

export default function streakPreview(streaks:streakData[]) {

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.title}>Ongoing Streaks</Text>
                <Image style = {styles.streakFire} source={require("@/assets/images/fireEmoji.png")}></Image>
            </View>
            
            {getOngoingStreaks(streaks)?.map((d) => (
                <Text> {formKeysMinusDatePretty[d!.name as keyof typeof formKeysMinusDatePretty]}: {d!.currentStreak} {(d!.currentStreak > 1) ? "days" : "day"}</Text>
            ))}
        </View>

    );
}

function getOngoingStreaks(streaks:streakData[]){
    let ongoing = streaks.map((d) => {
        if (d.currentStreak >= 1){
            return d
        }
    })
    
    return ongoing
}

