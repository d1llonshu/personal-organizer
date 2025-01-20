import { useState, useEffect } from 'react';
import { View, TextInput,  Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVObject} from 'react-native-mmkv';
import { useRouter, useLocalSearchParams, Stack} from 'expo-router';

import { Habit } from "@/constants/habit"
import { styles, buttonColorTrue, buttonColorFalse } from "@/constants/stylesheet"
import { FormData, Submissions } from '@/constants/FormData';
import { generateDifferentDaysKey } from '@/components/helper';
import { CustomButton } from '@/components/customButton';

export default function dayPage() {
    const router = useRouter();
    const local = useLocalSearchParams<{day: string}>();
    const [habits, setHabits] = useMMKVObject<Habit[]>('activeHabits');
    const [days, setDays] = useMMKVObject<Submissions>('submissions');
    const [data, setData] = useState<FormData>();
    if(data == undefined){
      setData(days![local.day]);
    }
    const [infoSections, setInfoSections] = useState<JSX.Element[]>([]);
    const [form, setForm] = useState<JSX.Element[]>([]);
    const [buttonPressed, setButtonPressed] = useMMKVObject<boolean>("updateWithoutSave");
    if(buttonPressed === undefined){
      setButtonPressed(false);
    }

    useEffect(() => {
      const handleInputChange = (id: string, value: any) => {
        // setData((prevData: FormData) => ({
        //   ...prevData,
        //   [key]: value,
        // }));
        if (data) {
          // console.log(key + ": " + value);
          let temp = data;
          temp[id] = value;
          setData(temp);
          setButtonPressed(!buttonPressed);
        }
      };
      const save = () => {
        if (data) {
          setDays({
            ...days,
            [local.day]: data,
          });
        }
      }
      if(days){
        const generateForm = (habitsByCategory: { [key: string]: Habit[] }, editable: boolean) => {
          let sections: JSX.Element[] = [];
          for (const category in habitsByCategory) {
            let habitButtons = habitsByCategory[category].map((h) => {
              if (h.dataType === 'boolean'){
                  return(
                    <View key={"Habit"+h.habitID+"Button"}>
                      <CustomButton
                        title={h.prettyPrint}
                        disabled = {!editable}
                        onPress={() => {handleInputChange(h.habitID,!data?.[h.habitID])}}
                        color={(data?.[h.habitID]? buttonColorTrue : buttonColorFalse) || "#FFA500"}
                      />
                    </View>
                    
                  );
              }
            });
            let habitTextInputs = habitsByCategory[category].map((h) => {
              let test2 = String(data? data[h.habitID]:"");
              if (h.dataType === 'number'){
                  return(
                    <View key={"Habit"+h.habitID+"TextInput"}style={styles.row}>
                      <Text style={styles.textInputTitle}>{h.prettyPrint}:</Text>
                      <TextInput
                        style={styles.textInput}
                        value={test2}
                        onChangeText={(value) => handleInputChange(h.habitID, value)}
                        keyboardType='numeric'
                        editable = {editable}
                      />
                    </View>
                  );
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
          if(editable){
            sections.push(
              <View key="SaveButton" style = {styles.formSaveButton}>
                <CustomButton               
                  title={"Save"}
                  disabled = {false}
                  onPress={()=>{
                    save();
                    console.log(data);
                    router.back();
                  }}
                  color = {buttonColorTrue}
                />
              </View>
            );
          }
          return sections;
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
          let today = new Date();
          let todaysKey: string = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
          
          setForm(generateForm(habitsByCategory, (generateDifferentDaysKey(todaysKey, 1) === local.day)));
          
          
        }
      }
    
      
    }, [data, buttonPressed])

    return(
        
        <SafeAreaView style = {styles.safeAreaContainer}>
          <ScrollView style = {styles.formContainer}>
            <Stack.Screen options={{ title: local.day }} />
            {/** TODO:  
             * Add streaks to new form
             * (?) Rework individual days storage from being the date as a key to putting all days in one JSON 
             */
              infoSections
              
            }
            {
              form
            }
        </ScrollView>
      </SafeAreaView>
    )
}