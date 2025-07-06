import { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Button, Text, ScrollView } from "react-native";
import { MMKV, useMMKVObject } from "react-native-mmkv";

import { styles } from "@/constants/stylesheet";
import { storage } from "@/constants/storage";
import {
  formData,
  formKeyAdditionalKeywords,
  formKeyClassifications,
  formKeysMinusDate,
  formKeysMinusDatePretty,
} from "@/constants/old_files/oldFormData";
import { dateFormat } from "@/constants/dateFormat";
import getDataAsArray from "@/components/old_files/getDataAsArray";
// import singleDayDataDisplay from '@/components/singleDayDataDisplay';
import getValueFromForm from "@/components/old_files/getValueFromForm";

export default function monthlySummary() {
  //rolling? averages
  //totals?
  //streaks?

  let today = new Date();
  let keyTemplate: string =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/";
  let daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  //const monthlyKeys = new Array(daysInMonth).fill(null).map((_, i) => keyTemplate + (i + 1).toString());
  let currentMonthKeys = new Array(today.getDate())
    .fill(null)
    .map((_, i) => keyTemplate + (i + 1).toString());
  if (today.getDate() - 1 == 0) {
    let daysInPrevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    keyTemplate = today.getFullYear() + "/" + today.getMonth() + "/";
    currentMonthKeys = new Array(today.getDate())
      .fill(null)
      .map((_, i) => keyTemplate + (i + 1).toString());
  }

  //getDataAsArray also populates missing entries if the key doesn't exist
  let monthlyData = currentMonthKeys.map((key) => {
    return getDataAsArray(key);
  });
  let totals: number[] = [];

  monthlyData.forEach((v, index) =>
    v.forEach((val, i) => {
      totals[i] = totals[i] ? totals[i] : 0;
      totals[i] += val;
    }),
  );
  let averages: number[] = totals.map((val) => {
    return val / currentMonthKeys.length;
  });

  //gets all props for class
  //we know this should not be undefined so long as getDataAsArray is run before it
  let props = formKeysMinusDate;

  //props and totals should be synced up in terms of index
  const indicies = [...Array(totals.length).keys()]; //new Array(totals.length).fill(null).map((_, i) => i + 1);
  console.log(indicies);

  // let totalOne = monthlyData.map((data) => {return data[0]})
  //               .reduce((accumulator, currentValue) => accumulator + currentValue, 0)//sums the array

  return (
    <ScrollView>
      <View>
        <Text style={styles.homeScreenSubtitle}>Monthly Summary</Text>
        {indicies?.map((key: number) => (
          <View key={key}>
            {appropriateSummaryView(
              props[key],
              totals[key],
              currentMonthKeys.length,
            )}
            {/* <Text>Monthly Average: {(averages[key]*100).toFixed(2)}%</Text> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function appropriateSummaryView(key: string, total: number, maxDays: number) {
  if (
    formKeyClassifications[key as keyof typeof formKeyClassifications] ==
      "Once Daily" ||
    formKeyClassifications[key as keyof typeof formKeyClassifications] ==
      "Once Weekly"
  ) {
    return (
      <Text style={styles.regularText}>
        {formKeysMinusDatePretty[key as keyof typeof formKeysMinusDatePretty]}:{" "}
        {total} out of {maxDays}
      </Text>
    );
  } else if (
    formKeyClassifications[key as keyof typeof formKeyClassifications] ==
    "Greater than Zero"
  ) {
    return (
      <Text style={styles.regularText}>
        {formKeysMinusDatePretty[key as keyof typeof formKeysMinusDatePretty]}:{" "}
        {total}{" "}
        {
          formKeyAdditionalKeywords[
            key as keyof typeof formKeyAdditionalKeywords
          ]
        }
      </Text>
    );
  }
}
