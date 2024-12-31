//state management w/ array?
import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView } from 'react-native';
import { MMKV, useMMKVListener, useMMKVObject, useMMKVString } from 'react-native-mmkv';
import { SafeAreaView } from 'react-native-safe-area-context';

import { storage } from "@/constants/storage"
// import { formData, formKeysMinusDate } from "@/constants/formData"
import { Habit, dataTypes, timeClassifications, categories, keyPrettyPrint } from "@/constants/habit"
import updateStreaks from '@/components/updateStreaks'
import { streakData } from '@/constants/streaks';
import { CustomButton } from "@/components/customButton"
import { styles } from '@/constants/stylesheet'

interface formData {
  [key: string]: any;
}

export default function Form() {
    const buttonColorFalse = "#CF6679";
    const buttonColorTrue = "#4f7942";
    let today = new Date();
    let submissionKey: string = 
      today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + (today.getDate());
    
    const [data, setData] = useMMKVObject<formData>(submissionKey);
    const [streaks, setStreaks] = useMMKVObject<streakData[]>('streaks');
    const [habits, setHabits] = useMMKVObject<Habit[]>('allHabits');
    const [test, setTest] = useState<string>('');

    const [formSections, setFormSections] = useState<JSX.Element[]>([]);

    useEffect(() => {
      if (data == null && habits) {
        let defaultData: formData = {};
        habits.forEach((habit) => {
          if (habit.dataType === 'boolean') {
            defaultData[habit.keyName] = false;
          } else if (habit.dataType === 'number') {
            defaultData[habit.keyName] = '0';
          } else {
            defaultData[habit.keyName] = 'ERROR THIS SHOULD NOT APPEAR';
          }
        });
        setData(defaultData);
      }
      if (habits){
        let categories : string[] = (habits).map((h) => {
          return h.category
        });
        let uniqueCategories = new Set<string>(categories);
        let habitsByCategory: {[key: string]: Habit[]} = {};
        uniqueCategories.forEach((c) => {
            let hArr : Habit[] = [];
            (habits? habits : []).map((h) => {
                if (h.category == c){
                    hArr.push(h)
                }
            });
            if(hArr.length > 0){
                habitsByCategory[c] = hArr
            }
        })
        generateForm(habitsByCategory)
      }
      
    }, [data, habits]);
  
    const handleInputChange = (key: string, value: any) => {
      setData((prevData: formData) => ({
        ...prevData,
        [key]: value,
      }));
    };
    const generateForm = (habitsByCategory: { [key: string]: Habit[] }) => {
      let sections: JSX.Element[] = [];
      for (const category in habitsByCategory) {
        let habitButtons = habitsByCategory[category].map((h) => {
          switch (h.dataType) {
            case 'boolean':
              return(
                <CustomButton
                    title={h.prettyPrint}
                    onPress={() => handleInputChange(h.keyName, !data?.[h.keyName]) }
                    color={(data?.[h.keyName]? buttonColorTrue : buttonColorFalse) || "#FFA500"}
                />
              );
            default:
              return null;
          }
        });
        let habitTextInputs = habitsByCategory[category].map((h) => {
          switch (h.dataType) {
            case 'number':
              return(
                <View style={styles.row}>
                  <Text style={styles.textInputTitle}>{h.prettyPrint}:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={data?.[h.keyName] || ''}
                    onChangeText={(value) => handleInputChange(h.keyName, value)}
                    keyboardType='numeric'
                  />
                </View>
              );
            default:
              return null;
          }
        });
        sections.push(
          <View key={category}>
            <Text style={styles.title}>{category}:</Text>
            <View style={styles.buttonRow}>{habitButtons}</View>
            {habitTextInputs}
          </View>
        );
      }
      setFormSections(sections);
    }

    // "#BB86FC" "#3700B3" "#84b067"
  
    return (
      <SafeAreaView style = {styles.safeAreaContainer}>
          <ScrollView>
          {/** TODO: generate page by passing in habits by category, which then sorts out the 
           * habits by button/text input before creating the component
           */
           formSections
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
