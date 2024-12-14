import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { storage } from "@/constants/storage"
import { formData } from "@/constants/formData"
import { dateFormat } from '@/constants/dateFormat';

export default function getDataAsArray(submissionKey : string) {
    console.log(submissionKey)
    const [data, setData] = useMMKVObject<formData>(submissionKey);
    let result: number[] = [];

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            let val = data[key as keyof formData]
            if (typeof val == "boolean"){
                if (val){
                    result.push(1)
                }
                else{
                    result.push(0)
                }
            }
            else if (typeof val == "number"){
                result.push(val);
            }
        }
      }
    console.log(result)
    return result
}

