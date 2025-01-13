import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { Habit, dataTypes, timeClassifications, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet"
import { FormData, Submissions } from '@/constants/FormData';

export default function monthlySummaryNew(habits: Habit[], submissions: Submissions) {
    //add support for checking for any given month

    let sections: JSX.Element[] = [];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];

    let today = new Date();
    let keyTemplate : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/";
    let daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    //const monthlyKeys = new Array(daysInMonth).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
    let currentMonthKeys = new Array(today.getDate()).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
    if (today.getDate() - 1 == 0){
      let daysInPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      keyTemplate = today.getFullYear() + "/" + (today.getMonth()) + "/";
      currentMonthKeys = new Array(today.getDate()).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
    }

    let data: { [key: string]: number } = {};
    habits.forEach((h) => {
      data[h.prettyPrint] = 0;
    })

    currentMonthKeys.forEach((key) => {
      if (key in submissions){
        let s = submissions[key];
        habits.forEach((h) => {
          if(s[h.keyName]){
            switch (h.dataType) {
              case 'boolean':
                if(s[h.keyName]){
                  data[h.prettyPrint]++;
                }
                break;
              case 'number':
                data[h.prettyPrint] = data[h.prettyPrint] + s[h.keyName];
                break;
              default:
                throw Error("Habit is not boolean or number, is: " + h.dataType)
            }
          }
        })
      }
    });
    console.log(data);
    console.log("test");
    sections.push(
      <View key={"monthlySummaryTitle"}>
        <Text style={styles.homeScreenSubtitle}>{monthNames[today.getMonth()]+" Summary"}</Text>
      </View>
    )
    Object.keys(data).forEach((key) => {
      let count = data[key];
      sections.push(
      <View key={key+"MonthSummary"}>
        <Text style={styles.regularText}>{key} : {count}/{currentMonthKeys.length} {(currentMonthKeys.length===1)? "day" : "days"}</Text>
      </View>
      )
    });


    return (
      
        // <ScrollView>
        //   <View>
        //     <Text style={styles.homeScreenSubtitle}>Monthly Summary</Text>
        //     {indicies?.map((key:number) => (
        //         <View key={key} >
        //           {appropriateSummaryView(props[key], totals[key], currentMonthKeys.length)}
        //           {/* <Text>Monthly Average: {(averages[key]*100).toFixed(2)}%</Text> */}
        //         </View>
        //       ))}
        //   </View>
        // </ScrollView>
        sections
    )
}

// function appropriateSummaryView(key : string, total : number, maxDays : number){
//   if(formKeyClassifications[key  as keyof typeof formKeyClassifications] == "Once Daily" || formKeyClassifications[key as keyof typeof formKeyClassifications] == "Once Weekly"){
//     return (
//       <Text style={styles.regularText}>{formKeysMinusDatePretty[key as keyof typeof formKeysMinusDatePretty]}: {total} out of {maxDays}</Text>
//     )
//   }
//   else if(formKeyClassifications[key as keyof typeof formKeyClassifications] == "Greater than Zero"){
//     return(
//       <Text style={styles.regularText}>{formKeysMinusDatePretty[key as keyof typeof formKeysMinusDatePretty]}: {total} {formKeyAdditionalKeywords[key as keyof typeof formKeyAdditionalKeywords]}</Text>
//     )
//   }

// }

