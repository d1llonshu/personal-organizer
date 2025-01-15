import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';

import { Habit, dataTypes, boolGoals, categories, keyPrettyPrint } from "@/constants/habit"
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
    if(habits&&submissions){
      let data: { [key: string]: number } = {};
      habits.forEach((h) => {
        data[h.keyName] = 0;
      })

      currentMonthKeys.forEach((key) => {
        if (key in submissions){
          let s = submissions[key];
          habits.forEach((h) => {
            if(s[h.keyName]){
              switch (h.dataType) {
                case 'boolean':
                  if(s[h.keyName]){
                    data[h.keyName]++;
                  }
                  break;
                case 'number':
                  data[h.keyName] = data[h.keyName] + Number(s[h.keyName]);
                  break;
                default:
                  throw Error("Habit is not boolean or number, is: " + h.dataType)
              }
            }
          })
        }
      });

      sections.push(
        <View key={"monthlySummaryTitle"}>
          <Text style={styles.homeScreenSubtitle}>{monthNames[today.getMonth()]+" Summary"}</Text>
        </View>
      )
      habits.forEach((h) => {
        let count = data[h.keyName];
        if(h.dataType == "boolean"){
          sections.push(
            <View key={h.keyName+"MonthSummary"}>
              <Text style={styles.regularText}>{h.prettyPrint} : {count}/{currentMonthKeys.length} {(currentMonthKeys.length===1)? "day" : "days"}</Text>
            </View>
          )
        }
        else if (h.dataType == "number"){
          sections.push(
            <View key={h.keyName+"MonthSummary"}>
              <Text style={styles.regularText}>{h.prettyPrint} : {count} minutes</Text>
            </View>
          )
        }
        
      });
    }
    


    return (
        sections
    )
}

