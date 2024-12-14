import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { storage } from "@/constants/storage"
import { formData } from "@/constants/formData"
import { dateFormat } from '@/constants/dateFormat';
import getDataAsArray  from "@/components/getDataAsArray"
import singleDayDataDisplay from '@/components/singleDayDataDisplay';

export default function DataDisplay() {
    //rolling? averages
    //totals?
    //streaks?

    // const [keys, setKeys] = useState<string[]>([]);
    // const [test, setTest] = useState<any>(null);
    
    // useEffect(() => {
    //   let today = new Date();
    //   let keyTemplate: string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/";
    //   let daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
    //   const monthlyKeys = new Array(daysInMonth).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
    //   setTest(getDataAsArray(monthlyKeys[0]));
  
    //   const allKeys = storage.getAllKeys();
    //   setKeys(allKeys);
    // }, []);
    const [keys, setKeys] = useState<string[]>(storage.getAllKeys());
    // const [test, setTest] = useState<number[]>([]);
    let today = new Date();
    let keyTemplate : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/";
    let daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const monthlyKeys = new Array(daysInMonth).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
    //current solution probably won't deal with updates well..., may need to have a listener with mmkv or something to use useEffect on
    let monthlyData = monthlyKeys.map((key) => { return getDataAsArray(key) })

    // useEffect(() => {

    // }, [test]);

    //const [data, setData] = useMMKVObject<formData>(submissionKey);
    //create array of acceptable keys, something like either last 30 days or all keys for a given month
    //use some method to go through each key, calculate totals/averages, etc. in theory for any size array
    // 
    // const [data, setData] = useMMKVObject<formData>(submissionKey);
    // const today_date = data? data.dateSubmitted.toLocaleDateString("en-US", dateFormat) : "No Data Found";
    
    return (
        <View style={styles.container}>
            {/* {keys?.map((key:string) => (
              <View key={key}>
                {singleDayDataDisplay(key)}
                <Text> </Text>
              </View>
            ))} */}
            <Text>{monthlyData.toString()}</Text>
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

