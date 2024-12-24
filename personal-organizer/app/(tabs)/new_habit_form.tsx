import { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, Button, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';

import { habit, dataTypes, timeClassifications, categories } from "@/constants/habit"
import { styles, dropdownStyles } from "@/constants/stylesheet"
import DropdownComponent from '@/components/dropdownComponent';





const { width } = Dimensions.get('window');
export default function newHabitForm() {
    //const [keyName, setkeyName] = useState<string>('exampleHabit');
    const [prettyPrint, setPrettyPrint] = useState<string>('');
    const ref = useRef<IDropdownRef>(null);
    const [dataType, setDataType] = useState<string>();
    const [timeClassification, setTimeClassification] = useState<string>()
    const [category, setCategory] = useState<string>()

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
            </ScrollView>
        </SafeAreaView>
    );
}

