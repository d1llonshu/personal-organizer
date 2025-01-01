import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import { MMKV, useMMKVObject} from 'react-native-mmkv';

import { Habit, dataTypes, timeClassifications, categories, keyPrettyPrint } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet"
import DropdownComponent from '@/components/dropdownComponent';
import { CustomButton } from "@/components/customButton"

const { width } = Dimensions.get('window');
export default function newHabitForm() {
    //const [keyName, setkeyName] = useState<string>('exampleHabit');
    const [prettyPrint, setPrettyPrint] = useState<string>('');
    const ref = useRef<IDropdownRef>(null);
    const [dataType, setDataType] = useState<string>();
    const [timeClassification, setTimeClassification] = useState<string>()
    const [category, setCategory] = useState<string>()
    const [habitsArray, setHabitsArray] = useMMKVObject<Habit[]>('activeHabits')

    const save = () => {
      //needs field validation
      console.log('Saving...');
      let submission : Habit = {
        prettyPrint: prettyPrint,
        keyName:keyPrettyPrint(prettyPrint),
        dataType: dataType ? dataType : "Error: No data type",
        timeClassification: timeClassification ? timeClassification : "Error: No time classification",
        category: category ? category : "Error, No category",
      };
      setHabitsArray([...habitsArray ? habitsArray:[], submission]);
      //clear form
      setPrettyPrint("");
      setDataType("");
      setTimeClassification("");
      setCategory("");
      console.log(habitsArray)
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
                <View style={styles.row}>
                    <Text style={dropdownStyles.title}>Habit:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Biking'
                        placeholderTextColor="gray" 
                        value={prettyPrint}
                        onChangeText={setPrettyPrint}
                    />
                </View>
                <View style={dropdownStyles.dropdownRow}>
                    <Text style={dropdownStyles.title}>Type:</Text>
                        <Dropdown
                          style={dropdownStyles.dropdown}
                          placeholderStyle={dropdownStyles.placeholderStyle}
                          selectedTextStyle={dropdownStyles.selectedTextStyle}
                          inputSearchStyle={dropdownStyles.inputSearchStyle}
                          iconStyle={dropdownStyles.iconStyle}
                          data={dataTypes}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select item"
                          value={dataType}
                          onChange={item => {
                            setDataType(item.value);
                          }}
                        />
                </View>
                <View style={dropdownStyles.dropdownRow}>
                    <Text style={dropdownStyles.title}>Time Scale:</Text>
                        <Dropdown
                          style={dropdownStyles.dropdown}
                          placeholderStyle={dropdownStyles.placeholderStyle}
                          selectedTextStyle={dropdownStyles.selectedTextStyle}
                          inputSearchStyle={dropdownStyles.inputSearchStyle}
                          iconStyle={dropdownStyles.iconStyle}
                          data={timeClassifications}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select item"
                          value={timeClassification}
                          onChange={item => {
                            setTimeClassification(item.value);
                          }}
                        />
                </View>
                <View style={dropdownStyles.dropdownRow}>
                    <Text style={dropdownStyles.title}>Category:</Text>
                        <Dropdown
                          style={dropdownStyles.dropdown}
                          placeholderStyle={dropdownStyles.placeholderStyle}
                          selectedTextStyle={dropdownStyles.selectedTextStyle}
                          inputSearchStyle={dropdownStyles.inputSearchStyle}
                          iconStyle={dropdownStyles.iconStyle}
                          data={categories}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select item"
                          value={category}
                          onChange={item => {
                            setCategory(item.value);
                          }}
                        />
                </View>
                <CustomButton               
                    title={"Submit"}
                    onPress={()=>{
                      save();
                    }}
                    color = "#4f7942"
                  />
            </ScrollView>
        </SafeAreaView>
    );
}

