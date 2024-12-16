import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { storage } from "@/constants/storage"
import { formData, formKeys } from "@/constants/formData"
import { dateFormat } from '@/constants/dateFormat';
import getDataAsArray  from "@/components/getDataAsArray"
import singleDayDataDisplay from '@/components/singleDayDataDisplay';
import getValueFromForm from '@/components/getValueFromForm';

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

    // const [test, setTest] = useState<number[]>([]);
    let today = new Date();
    let keyTemplate : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/";
    let daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const monthlyKeys = new Array(daysInMonth).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
    let currentMonthKeys = new Array(today.getDate()).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
    if (today.getDate() - 1 == 0){
      let daysInPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      keyTemplate = today.getFullYear() + "/" + (today.getMonth()) + "/";
      currentMonthKeys = new Array(today.getDate()).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
    }

    //getDataAsArray also populates missing entries if the key doesn't exist
    let monthlyData = currentMonthKeys.map((key) => { return getDataAsArray(key) })
    let totals : number[] = [];

    monthlyData.forEach((v, index) =>
      v.forEach((val, i) => {
        totals[i] = totals[i] ? totals[i] : 0;
        totals[i] += val;
      })
    );
    let averages : number[] = totals.map((val) => {
      return val/currentMonthKeys.length
    })


    //gets all props for class
    //we know this should not be undefined so long as getDataAsArray is run before it
    const [todaysEntry, setTodaysEntry] = useMMKVObject<formData>(currentMonthKeys[0]);
    let props = Object.getOwnPropertyNames(todaysEntry);
    props = props.splice(1, props.length); //removes the date 

    //props and totals should be synced up in terms of index
    const indicies =  [...Array(totals.length).keys()]//new Array(totals.length).fill(null).map((_, i) => i + 1);
    console.log(indicies)

    // let totalOne = monthlyData.map((data) => {return data[0]})
    //               .reduce((accumulator, currentValue) => accumulator + currentValue, 0)//sums the array


    // useEffect(() => {

    // }, [test]);

    //const [data, setData] = useMMKVObject<formData>(submissionKey);
    //create array of acceptable keys, something like either last 30 days or all keys for a given month
    //use some method to go through each key, calculate totals/averages, etc. in theory for any size array
    // 
    // const [data, setData] = useMMKVObject<formData>(submissionKey);
    // const today_date = data? data.dateSubmitted.toLocaleDateString("en-US", dateFormat) : "No Data Found";
    
    return (
        <ScrollView>
          <View style={styles.container}>
            {/* {keys?.map((key:string) => (
                <View key={key}>
                  {singleDayDataDisplay(key)}
                  <Text> </Text>
                </View>
              ))} */}
            {indicies?.map((key:number) => (
                <View key={key}>
                  <Text>{props[key]}: {totals[key]}</Text>
                  <Text>Monthly Average: {averages[key].toFixed(2)}/day</Text>
                  
                  <Text> </Text>
                </View>
              ))}
          </View>
        </ScrollView>
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

