import { useState, useCallback, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Button,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown, IDropdownRef } from "react-native-element-dropdown";
import { MMKV, useMMKVObject } from "react-native-mmkv";
import { Link, usePathname, useRouter } from "expo-router";

import {
  Habit,
  dataTypes,
  timeframes,
  categories,
  keyPrettyPrint,
} from "@/constants/habit";
import { styles, dropdownStyles } from "@/constants/stylesheet";
import DropdownComponent from "@/components/dropdownComponent";
import { CustomButton } from "@/components/customButton";

export default function newHabitForm() {
  const router = useRouter();
  //const [keyName, setkeyName] = useState<string>('exampleHabit');
  const [prettyPrint, setPrettyPrint] = useState<string>("");
  const ref = useRef<IDropdownRef>(null);
  const [dataType, setDataType] = useState<string>();
  const [goal, setGoal] = useState<string>();
  const [timeframe, setTimeframe] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [habitsArray, setHabitsArray] = useMMKVObject<Habit[]>("activeHabits");
  if (habitsArray === undefined) {
    let temp: Habit[] = [];
    setHabitsArray(temp);
  }
  const [habitIDCounter, setHabitIDCounter] =
    useMMKVObject<number>("habitIDCounter");
  if (habitIDCounter === undefined) {
    setHabitIDCounter(0);
  }

  const save = () => {
    // needs field validation
    console.log("Saving...");
    if (
      prettyPrint == "" ||
      dataType == undefined ||
      goal == undefined ||
      category == undefined ||
      timeframe == undefined
    ) {
      Alert.alert("All fields are required");
      return false;
    }
    if (
      passesFormValidation(
        prettyPrint,
        dataType,
        goal,
        category,
        timeframe,
        habitsArray ? habitsArray : [],
      )
    ) {
      let today = new Date();
      let todaysKey: string =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);
      let submission: Habit = {
        prettyPrint: prettyPrint,
        habitID: String(habitIDCounter ? habitIDCounter : 0),
        dataType: dataType ? dataType : "No data type",
        goal: goal ? goal : "No goal",
        timeframe: timeframe ? timeframe : "No timeframe",
        category: category ? category : "No category",
        history: [
          {
            startDate: todaysKey,
            endDate: "",
            goal: goal ? goal : "No goal",
            timeframe: timeframe ? timeframe : "No timeframe",
          },
        ],
      };
      setHabitsArray([...(habitsArray ? habitsArray : []), submission]);
      setHabitIDCounter((habitIDCounter ? habitIDCounter : 0) + 1);
      //clear form
      setPrettyPrint("");
      setDataType(undefined);
      setGoal(undefined);
      setTimeframe(undefined);
      setCategory(undefined);
      console.log(habitsArray);
      return true;
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <View key={"nameInput"} style={styles.row}>
          <Text style={dropdownStyles.titleWithLessMargin}>Habit:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Biking"
            placeholderTextColor="gray"
            value={prettyPrint}
            onChangeText={setPrettyPrint}
          />
        </View>

        <View key={"categoryInput"} style={dropdownStyles.dropdownRow}>
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
            onChange={(item) => {
              setCategory(item.value);
            }}
          />
        </View>

        <View key={"dataTypeInput"} style={dropdownStyles.dropdownRow}>
          <Text style={dropdownStyles.title}>Metric:</Text>
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
            onChange={(item) => {
              setDataType(item.value);
            }}
          />
        </View>

        <View key={"goalInput"} style={dropdownStyles.dropdownRow}>
          <Text style={dropdownStyles.title}>Target Time:</Text>
          <TextInput
            style={dropdownStyles.dropdownTextInput}
            placeholder="15"
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={goal}
            onChangeText={setGoal}
          />
          <Dropdown
            style={dropdownStyles.dropdownSmall}
            placeholderStyle={dropdownStyles.placeholderStyle}
            selectedTextStyle={dropdownStyles.selectedTextStyle}
            inputSearchStyle={dropdownStyles.inputSearchStyle}
            iconStyle={dropdownStyles.iconStyle}
            data={timeframes}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={timeframe}
            onChange={(item) => {
              setTimeframe(item.value);
            }}
          />
        </View>

        <View key={"submitButton"}>
          <CustomButton
            title={"Submit"}
            disabled={false}
            onPress={() => {
              if (save()) {
                router.back();
              }
            }}
            color="#4f7942"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function passesFormValidation(
  prettyPrint: string,
  dataType: string,
  goal: string,
  category: string,
  timeframe: string,
  habits: Habit[],
): Boolean {
  if (Number(goal) <= 0) {
    Alert.alert("Goal should be greater than 0!");
    return false;
  } else if (
    dataType == "boolean" &&
    timeframe == "Daily" &&
    Number(goal) > 1
  ) {
    Alert.alert("Yes/No habits can only be done once per day");
    return false;
  } else if (
    dataType == "boolean" &&
    timeframe == "Weekly" &&
    Number(goal) > 7
  ) {
    Alert.alert(
      "Yes/No habits can only be done once per day and cannot be done more than 7 times a week",
    );
    return false;
  }

  return true;
}
