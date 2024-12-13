import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { storage } from "@/constants/storage"
import { formData } from "@/constants/formData"
import { dateFormat } from '@/constants/dateFormat';

export default function singleDayDataDisplay(submissionKey : string) {
    const [data, setData] = useMMKVObject<formData>(submissionKey);
    return (
        <View>
            <Text style={styles.title}>{submissionKey}</Text>

            <Text>Brushed Teeth (Morning): {data ? (data.morningBrush ? "Yes" : "No"): "No Data Found" }</Text>
            <Text>Brushed Teeth (Night): {data ? (data.nightBrush ? "Yes" : "No"): "No Data Found" }</Text>
            <Text>Used Mouthwash: {data ? (data.usedMouthwash ? "Yes" : "No"): "No Data Found" }</Text>
            <Text>Washed Face: {data ? (data.washedFace? "Yes" : "No"): "No Data Found" }</Text>
            <Text>Exfoliated: {data ? (data.usedExfoliator ? "Yes" : "No"): "No Data Found" }</Text>
            <Text>Showered: {data ? (data.showered ? "Yes" : "No"): "No Data Found" }</Text>
            <Text>Took Medication: {data ? (data.tookMedicine ? "Yes" : "No"): "No Data Found" }</Text>

            <Text>Minutes Biked: {data ? data.minutesBiked : "No Data Found" }</Text>
            <Text>Situps: {data ? data.situpsDone : "No Data Found" }</Text>
            <Text>Pushups: {data ? data.pushupsDone : "No Data Found" }</Text>

            <Text>Leetcode (minutes): {data ? data.leetcodeMinutes: "No Data Found" }</Text>
            <Text>Personal Project (minutes): {data ? data.personalProjectMinutes: "No Data Found" }</Text>
            <Text>Art (minutes): {data ? data.artMinutes: "No Data Found" }</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#eaeaea',
    },
    title: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
});

