import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { storage } from "@/constants/storage"
import { formData } from "@/constants/formData"
import { dateFormat } from '@/constants/DateFormat';
import singleDayDataDisplay from '@/components/singleDayDataDisplay';

export default function DataDisplay() {
    //streaks
    //rolling? averages
    //totals?

    let today = new Date();
    let submissionKey : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()
    // const [data, setData] = useMMKVObject<formData>(submissionKey);
    // const today_date = data? data.dateSubmitted.toLocaleDateString("en-US", dateFormat) : "No Data Found";
    return (
        <View style={styles.container}>
            {singleDayDataDisplay(submissionKey)}
        </View>
        // <View>
        //     <Text>Date: {submissionKey}</Text>
        //     <Text>Minutes Biked: {data ? data.minutesBiked : "No Data Found" }</Text>
        //     <Text>Situps: {data ? data.situpsDone : "No Data Found" }</Text>
        //     <Text>Pushups: {data ? data.pushupsDone : "No Data Found" }</Text>
        //     <Text>Minutes Worked: {data ? data.minutesWorked: "No Data Found" }</Text>
        // </View>
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
    keys: {
      fontSize: 14,
      color: 'grey',
    },
    title: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      marginVertical: 20,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
    },
});

