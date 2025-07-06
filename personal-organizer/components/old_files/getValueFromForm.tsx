import { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { MMKV, useMMKVObject } from "react-native-mmkv";

import { storage } from "@/constants/storage";
import { formData } from "@/constants/old_files/oldFormData";
import { dateFormat } from "@/constants/dateFormat";

export default function getValueFromForm(submissionKey: string, field: string) {
  //gets data from formdata as an array
  console.log(submissionKey);
  const [data, setData] = useMMKVObject<formData>(submissionKey);
  let intendedDate = new Date(submissionKey);
  let result: number[] = [];

  //create the object if it doesnt exist already
  if (typeof data != "object") {
    setData(new formData(intendedDate));
  }

  let val = data ? data[field as keyof formData] : 0;
  console.log(val);
  if (typeof val == "boolean") {
    result.push(val ? 1 : 0);
  } else if (typeof val == "number") {
    result.push(val);
  }

  // console.log(test)
  return result;
}
