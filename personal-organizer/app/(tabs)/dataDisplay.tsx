import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { storage } from "@/constants/storage"
import { formData } from "@/constants/formData"
import { dateFormat } from '@/constants/DateFormat';

export default function dataDisplay() {
    //streaks
    //rolling? averages

    let today = new Date();
    let submissionKey: string = 
        today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()
    const [data, setData] = useMMKVObject<formData>(submissionKey);
    // const today_date = data? data.dateSubmitted.toLocaleDateString("en-US", dateFormat) : "No Data Found";
    return (
        <View>
            <Text>Date: {submissionKey}</Text>
            <Text>Minutes Biked: {data ? data.minutesBiked : "No Data Found" }</Text>
            <Text>Situps: {data ? data.situpsDone : "No Data Found" }</Text>
            <Text>Pushups: {data ? data.pushupsDone : "No Data Found" }</Text>
            <Text>Minutes Worked: {data ? data.minutesWorked: "No Data Found" }</Text>
        </View>
    )
}