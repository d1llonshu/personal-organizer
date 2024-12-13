import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { storage } from "@/constants/storage"
import { formData } from "@/constants/formData"
import { dateFormat } from '@/constants/dateFormat';
import singleDayDataDisplay from '@/components/singleDayDataDisplay';

export default function DataDisplay() {
    //streaks
    //rolling? averages
    //totals?

    let today = new Date();
    let submissionKey : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()
    // const [data, setData] = useMMKVObject<formData>(submissionKey);
    // const today_date = data? data.dateSubmitted.toLocaleDateString("en-US", dateFormat) : "No Data Found";
    const keys = storage.getAllKeys() 
    return (
        <View style={styles.container}>
            {keys?.map((key:string) => (
              <View key={key}>
                {singleDayDataDisplay(key)}
                <Text> </Text>
              </View>
            ))}
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

