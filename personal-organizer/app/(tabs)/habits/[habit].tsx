import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMMKVObject } from "react-native-mmkv";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Surface } from "react-native-paper";
import { Dropdown, IDropdownRef } from "react-native-element-dropdown";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

import { LineChart } from "react-native-gifted-charts";

import { Habit, habitHistory, timeframes } from "@/constants/habit";
import {
  styles,
  dropdownStyles,
  buttonColorTrue,
  calendarTheme,
} from "@/constants/stylesheet";
import { CustomButton } from "@/components/customButton";
import { passesFormValidation } from "./newHabitForm";
import {
  calculateStatsForPeriodSpecific,
  generateConsecutiveKeys,
  generateDifferentDaysKey,
  getGoalForDate,
  weeksSinceCreated,
} from "@/components/helper";
import { Submissions } from "@/constants/FormData";

export default function habitsPage() {
  //currently does not update edits made visually you reload the page from list of habits
  const router = useRouter();
  const local = useLocalSearchParams<{ habit: string }>();
  const [currentHabit, setCurrentHabit] = useState<Habit>();
  const [submissions, setSubmissions] =
    useMMKVObject<Submissions>("submissions");
  const [habits, setHabits] = useMMKVObject<Habit[]>("activeHabits");
  const [goalText, setGoalText] = useState<string>("");
  const [editButton, setEditButton] = useState<boolean>(false);
  const [pageSections, setPageSections] = useState<JSX.Element[]>([]);
  const [prettyPrint, setPrettyPrint] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("");
  const [chartWeeks, setChartWeeks] = useState<number>(7);
  const { from } = useLocalSearchParams();
  const handleBack = () => {
    console.log(local);
    if (from === "listView") {
      router.replace("/habits/habitsOverview"); // Default back behavior
    } else {
      router.replace("/"); // Go back to Home
    }
  };

  let noEdit = (longestStreak: JSX.Element[]) => {
    return (
      <Surface
        key={"noEditSurface"}
        style={styles.homeScreenSurface}
        elevation={1}
      >
        <View key={"category"} style={styles.row}>
          <Text style={styles.habitPageSubtitle}>Category: </Text>
          <Text style={styles.habitPageRegularText}>
            {currentHabit?.category}
          </Text>
        </View>
        <View key={"goal"} style={styles.row}>
          <Text style={styles.habitPageSubtitle}>Goal: </Text>
          <Text style={styles.habitPageRegularText}>{goalText}</Text>
        </View>
        <View key={"longest streak"} style={styles.row}>
          <Text style={styles.habitPageSubtitle}>Longest Streak: </Text>
          {longestStreak}
        </View>
        <View>
          <Text key={"history"} style={styles.habitPageSubtitle}>
            Goal History:{" "}
          </Text>
          {displayHistory(currentHabit ? currentHabit.history : [])}
        </View>
        <View key={"editButton"}>
          <CustomButton
            title={"Edit"}
            disabled={false}
            onPress={() => {
              setEditButton(!editButton);
            }}
            color="#4f7942"
          />
        </View>
      </Surface>
    );
  };

  let edit = (
    <Surface
      key={"editInfoSurface"}
      style={styles.homeScreenSurface}
      elevation={1}
    >
      <Text style={styles.habitPageSubtitle}>Edit:</Text>
      <View style={styles.row}>
        <Text style={dropdownStyles.titleWithEvenLessMargin}>Habit:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Biking"
          placeholderTextColor="gray"
          value={prettyPrint}
          onChangeText={setPrettyPrint}
        />
      </View>
      <View style={dropdownStyles.dropdownRow}>
        <Text style={dropdownStyles.title}>Goal:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="1"
          placeholderTextColor="gray"
          value={goal}
          onChangeText={setGoal}
          keyboardType="numeric"
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
      <CustomButton
        title={"Save"}
        disabled={false}
        onPress={() => {
          if (save()) {
            router.back();
          }
        }}
        color="#4f7942"
      />
      <CustomButton
        title={"Cancel"}
        disabled={false}
        onPress={() => {
          setEditButton(!editButton);
        }}
        color="#CF6679"
      />
    </Surface>
  );
  const save = () => {
    // needs field validation
    if (currentHabit && habits) {
      if (
        prettyPrint == currentHabit.prettyPrint &&
        goal == currentHabit.goal &&
        timeframe == currentHabit.timeframe
      ) {
        console.log("Nothing changed, not creating new history entry.");
        return true;
      }

      console.log("Saving...");
      if (prettyPrint == "" || goal == undefined || timeframe == undefined) {
        Alert.alert("All fields are required");
        return false;
      } else if (
        passesFormValidation(
          prettyPrint,
          currentHabit.dataType,
          goal,
          currentHabit.category,
          timeframe,
          habits ? habits : [],
        )
      ) {
        let today = new Date();
        let todaysKey =
          today.getFullYear() +
          "-" +
          ("0" + (today.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + today.getDate()).slice(-2);
        let historyCopy = currentHabit.history;
        console.log(currentHabit);
        //only want new history entry if goals have changed. if just the name has changed we don't need a new one
        if (goal != currentHabit.goal || timeframe != currentHabit.timeframe) {
          historyCopy[currentHabit.history.length - 1] = {
            startDate:
              currentHabit.history[currentHabit.history.length - 1].startDate,
            endDate: generateDifferentDaysKey(todaysKey, 1),
            goal: currentHabit.history[currentHabit.history.length - 1].goal,
            timeframe:
              currentHabit.history[currentHabit.history.length - 1].timeframe,
          };
          historyCopy.push({
            startDate: todaysKey,
            endDate: "",
            goal: goal,
            timeframe: timeframe,
          });
        }
        let habitArrCopy = habits;
        habitArrCopy[Number(currentHabit.habitID)] = {
          prettyPrint: prettyPrint,
          habitID: currentHabit.habitID,
          dataType: currentHabit.dataType,
          goal: goal,
          timeframe: timeframe,
          category: currentHabit.category,
          history: historyCopy,
        };
        setHabits(habitArrCopy);
        return true;
      }
    } else {
      Alert.alert("Could not save: Habit missing");
      return false;
    }
  };

  useEffect(() => {
    if (habits) {
      habits.map((h) => {
        if (h.habitID === local.habit) {
          setCurrentHabit(h);
        }
      });
    }
  }, [local.habit]);

  useEffect(() => {
    if (currentHabit) {
      setGoalText(createGoalText(currentHabit));
      setPrettyPrint(currentHabit.prettyPrint);
      setTimeframe(currentHabit.timeframe);
      setGoal(currentHabit.goal);
      setChartWeeks(Math.min(weeksSinceCreated(currentHabit), 7));
      // let sections : JSX.Element[] = [];
      // if(editButton){
      //   sections.push(edit);
      // }
      // else{

      //   sections.push(noEdit(" Not Available"));
      // }
      // setPageSections(sections);
    }
  }, [currentHabit]);

  useEffect(() => {
    let sections: JSX.Element[] = [];
    if (currentHabit && submissions) {
      let calendar = createHabitCalendarMarks(currentHabit, submissions);

      let streak: JSX.Element = (
        <Text style={styles.habitPageRegularText}>{"Not Available"}</Text>
      );
      let dates = "";
      if (calendar.longestStreak.length > 0) {
        streak = (
          <Text style={styles.habitPageRegularText}>
            {String(calendar.longestStreak[0].length) +
              (calendar.longestStreak[0].length == 1 ? " day" : " days")}
          </Text>
        );
        calendar.longestStreak = calendar.longestStreak.reverse();
        for (let i = 0; i < calendar.longestStreak.length; i++) {
          dates =
            dates +
            "(" +
            prettyPrintDate(calendar.longestStreak[i].start) +
            " - " +
            prettyPrintDate(calendar.longestStreak[i].end) +
            ")";
          if (i != calendar.longestStreak.length - 1) {
            dates = dates + "\n";
          }
        }
      }
      if (editButton) {
        sections.push(edit);
        sections.push(
          generateChart(
            currentHabit,
            currentHabit.history,
            submissions,
            chartWeeks,
          ),
        );
      } else {
        sections.push(
          noEdit([
            streak,
            <Text style={styles.habitPageRegularTextWithMargin}>{dates}</Text>,
          ]),
        );
        sections.push(
          generateChart(
            currentHabit,
            currentHabit.history,
            submissions,
            chartWeeks,
          ),
        );
        sections.push(calendar.calendar);
      }
    }

    setPageSections(sections);
  }, [editButton, timeframe, prettyPrint, goal]);

  return (
    <SafeAreaView style={styles.safeAreaContainer} key={"SafeAreaView"}>
      <Stack.Screen
        key="Header/Nav"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => handleBack()}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="arrow-back" size={24} color="#E1D9D1" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#E1D9D1",
          },
          headerTintColor: "#E1D9D1", // Applies to icons and other header elements
        }}
      />
      <ScrollView key="ScrollView">
        <Stack.Screen options={{ title: currentHabit?.prettyPrint }} />
        {pageSections}
        {}

        {/* <View key="editButton" style = {styles.buttonContainer}>
              <Link href={{pathname:"/habits/[edit]", params: {edit: local.habit}}}>
                      <Text style={styles.dayPageHyperlink}>{"Edit"}</Text>
              </Link>
            </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
function createHabitCalendarMarks(
  habit: Habit,
  submissions: Submissions,
): {
  calendar: JSX.Element;
  longestStreak: { start: string; end: string; length: number }[];
} {
  const markedDates: {
    [key: string]: {
      disabled: boolean;
      startingDay: boolean;
      endingDay: boolean;
      color: string;
    };
  } = {};
  let keys = Object.keys(submissions);
  let streakArr = [];
  let longestStreak: { start: string; end: string; length: number } = {
    start: "",
    end: "",
    length: 0,
  };
  let ongoingStreak: { start: string; end: string; length: number } = {
    start: "",
    end: "",
    length: 0,
  };

  if (habit.timeframe == "Daily") {
    for (let i = 0; i < keys.length; i++) {
      if (
        Number(submissions[keys[i]][habit.habitID]) >=
        Number(getGoalForDate(habit, keys[i]).goal)
      ) {
        //streak continues, sets end to current date in case next entry doesn't meet goal
        if (
          new Date(keys[i - 1]).getTime() - new Date(keys[i]).getTime() ===
            -86400000 &&
          markedDates[keys[i - 1]].disabled == false
        ) {
          markedDates[keys[i]] = {
            disabled: false,
            color: buttonColorTrue,
            startingDay: false,
            endingDay: false,
          };
          ongoingStreak.length = ongoingStreak.length + 1;
          ongoingStreak.end = keys[i]; //sets ongoing end
        }

        //starting new streak
        else {
          if (ongoingStreak.length > longestStreak.length) {
            longestStreak = ongoingStreak;
          }
          //account for streaks of equal length
          else if (
            ongoingStreak.length == longestStreak.length &&
            ongoingStreak.length != 0
          ) {
            streakArr.push(ongoingStreak);
          }
          ongoingStreak = { start: keys[i], end: "", length: 1 }; //sets ongoing start
          if (i != 0) {
            markedDates[keys[i - 1]].endingDay = true;
          }

          markedDates[keys[i]] = {
            disabled: false,
            color: buttonColorTrue,
            startingDay: true,
            endingDay: false,
          };
        }
      }
      //doesn't start new streak but will end ongoing one
      else {
        if (ongoingStreak.length > longestStreak.length) {
          longestStreak = ongoingStreak;
        }
        //account for streaks of equal length
        else if (
          ongoingStreak.length == longestStreak.length &&
          ongoingStreak.length != 0
        ) {
          streakArr.push(ongoingStreak);
        }
        ongoingStreak = { start: "", end: "", length: 0 };
        if (i != 0) {
          markedDates[keys[i - 1]].endingDay = true;
        }
        markedDates[keys[i]] = {
          disabled: true,
          color: "none",
          startingDay: false,
          endingDay: false,
        };
      }
    }
    streakArr.push(longestStreak);

    console.log(streakArr);

    return {
      calendar: (
        <Surface
          key={"calendarSurface"}
          style={styles.homeScreenSurface}
          elevation={1}
        >
          <Calendar
            disableAllTouchEventsForDisabledDays
            enableSwipeMonths
            disabledByDefault
            minDate={keys[0]}
            markingType={"period"}
            markedDates={markedDates}
            theme={calendarTheme}
          />
        </Surface>
      ),
      longestStreak: streakArr,
    };
  } else {
    //Weekly not implemented yet
    return { calendar: <View></View>, longestStreak: [] };
  }
}
function createGoalText(habit: Habit) {
  let text = "";
  if (habit.goal === "1" && habit.dataType === "boolean") {
    text = "Once " + habit.timeframe;
  } else {
    text =
      habit.goal +
      " " +
      (habit.dataType === "boolean" ? "times" : "minutes") +
      " " +
      (habit.timeframe == "Daily" ? "per day" : "per week");
  }
  return text;
}
function displayHistory(history: habitHistory[]) {
  let sections: JSX.Element[] = [];

  for (let i = 0; i < history.length; i++) {
    prettyPrintDate(history[i].startDate);
    sections.push(
      <View key={"habitHistory" + i}>
        <Text style={styles.habitPageRegularTextWithMargin}>
          {history[i].goal}, {history[i].timeframe} {"("}
          {prettyPrintDate(history[i].startDate)} -{" "}
          {history[i].endDate === ""
            ? "Present"
            : prettyPrintDate(history[i].endDate)}
          {")"}
        </Text>
      </View>,
    );
  }
  return sections;
}

function prettyPrintDate(date: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let prettyPrint =
    shortMonths[Number(date.slice(5, 7)) - 1] +
    ". " +
    Number(date.slice(8, 10));
  if (date.slice(9, 10) === "1") {
    prettyPrint = prettyPrint + "st";
  } else if (date.slice(9, 10) === "2") {
    prettyPrint = prettyPrint + "nd";
  } else if (date.slice(9, 10) === "3") {
    prettyPrint = prettyPrint + "rd";
  } else {
    prettyPrint = prettyPrint + "th";
  }
  prettyPrint = prettyPrint + ", " + date.slice(0, 4);

  return prettyPrint;
}

//only support for weekly/daily
function generateChartData(
  habit: Habit,
  history: habitHistory[],
  submissions: Submissions,
  weeks: number,
) {
  let today = new Date();
  let todaysKey: string =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  let trueWeeks: number = today.getUTCDay() === 0 ? weeks : weeks - 1;
  let allKeys: string[] = generateConsecutiveKeys(
    todaysKey,
    today.getUTCDay() + trueWeeks * 7,
  ); //8 weeks, including current week
  let organizedKeys: string[][] = [];
  let data: { [key: string]: { total: number; goal: number } } = {};

  organizedKeys.push(allKeys.slice(0, today.getUTCDay()));
  let mult = 1;
  while (mult <= trueWeeks) {
    let week = allKeys.slice(
      today.getUTCDay() + 7 * (mult - 1),
      today.getUTCDay() + 7 * mult,
    );
    let g = getGoalForDate(habit, week[week.length - 1]);

    if (g.timeframe == "Weekly") {
      data[week[0].substring(week[0].length - 5, week[0].length)] = {
        total: calculateStatsForPeriodSpecific(habit, submissions, week)[0],
        goal: Number(g.goal),
      };
    } else {
      data[week[0].substring(week[0].length - 5, week[0].length)] = {
        total: calculateStatsForPeriodSpecific(habit, submissions, week)[0],
        goal: Number(g.goal) * 7,
      };
    }

    mult++;
  }

  // var keys2 = generateConsecutiveKeys(keys[keys.length-1],8).slice(1)
  for (const [key, value] of Object.entries(data)) {
    console.log(`Key: ${key}, Value: ${value}`);
  }
  return data;
}

function generateChartYLabels(
  sections: number,
  data: number[],
  goal: number[],
) {
  if (data.length === 0 || sections <= 0) return [];

  const maxValue = Math.max(Math.max(...goal), Math.max(...data));

  // Step 1: Round up to a "nice" maximum (ending in 0, 5, or even)
  let roundedMax = Math.ceil(maxValue);

  // If it's not a multiple of 5, round it up to the next multiple of 5
  if (roundedMax % 5 !== 0) {
    roundedMax += 5 - (roundedMax % 5);
  }

  // Step 2: Calculate interval size
  const interval = roundedMax / sections;

  // Step 3: Generate labels
  const labels: string[] = [];
  for (let i = 0; i <= sections; i++) {
    labels.push(String(Math.round(i * interval)));
  }

  return labels;
}

function generateChart(
  habit: Habit,
  history: habitHistory[],
  submissions: Submissions,
  numberOfWeeks: number,
) {
  let data = generateChartData(habit, history, submissions, numberOfWeeks);
  let sectionCount = 5;
  const results = [];
  const goals = [];
  const justResults = [];
  const justGoals = [];
  for (const [k, v] of Object.entries(data)) {
    results.push({ value: v.total, label: k });
    goals.push({ value: v.goal, label: k });
    justResults.push(v.total);
    justGoals.push(v.goal);
  }
  console.log((Dimensions.get("window").width - 92) / (numberOfWeeks + 2));
  results.reverse();
  goals.reverse();
  const yLabels = generateChartYLabels(sectionCount, justResults, justGoals);
  const {
    xAxisLabelFontSize,
    xAxisLabelMarginTop,
    spacing,
    initialSpacing,
    xAxisMarginLeft,
    xAxisLabelRotation,
  } = getChartLayoutSettings(numberOfWeeks);
  return (
    <View key={"chart"}>
      <Surface
        key={"chartSurface"}
        style={styles.homeScreenSurface}
        elevation={1}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 2,
            marginTop: 4,
            color: "#E1D9D1",
          }}
        >
          Progress Tracker
        </Text>
        <LineChart
          data2={results}
          data={goals}
          height={200}
          width={Dimensions.get("window").width - 76}
          adjustToWidth={true}
          isAnimated
          color2="#4A90E2"
          color1="#888"
          initialSpacing={
            (Dimensions.get("window").width - 100) / (numberOfWeeks + 3)
          }
          spacing={(Dimensions.get("window").width - 100) / numberOfWeeks}
          // endSpacing={10}
          dataPointsColor2="#E1D9D1"
          dataPointsColor1="#E1D9D1"
          startFillColor2="skyblue"
          startFillColor1="lightgray"
          xAxisLabelTextStyle={{ color: "#E1D9D1" }}
          yAxisTextStyle={{ color: "#E1D9D1" }}
          xAxisColor={"#E1D9D1"}
          yAxisColor={"#E1D9D1"}
          noOfSections={sectionCount}
          yAxisLabelTexts={yLabels}
          maxValue={Number(yLabels[yLabels.length - 1])}
          hideRules={false} //this is the axes
          rulesType="solid" // Change from dotted to solid
          rulesColor="#E1D9D1"
          rulesThickness={1}
          startOpacity={0.8}
          endOpacity={0.3}
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: "lightgray",
            pointerStripWidth: 2,
            pointerColor: "lightgray",
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            pointerLabelComponent: (items: any) => {
              return (
                <View
                  style={{
                    height: 120,
                    width: 100,
                    backgroundColor: "#282C3E",
                    borderRadius: 4,
                    justifyContent: "center",
                    paddingLeft: 16,
                  }}
                >
                  <Text style={{ color: "lightgray", fontSize: 12 }}>
                    {"Weekly Total"}
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {items[1].value}
                  </Text>
                  <Text
                    style={{ color: "lightgray", fontSize: 12, marginTop: 12 }}
                  >
                    {"Target"}
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {items[0].value}
                  </Text>
                </View>
              );
            },
          }}
        />
      </Surface>
    </View>
  );
}

type ChartLayoutSettings = {
  xAxisLabelFontSize: number;
  xAxisLabelMarginTop: number;
  spacing: number;
  initialSpacing: number;
  xAxisMarginLeft: number;
  xAxisLabelRotation: number;
};

function getChartLayoutSettings(weeksDisplayed: number): ChartLayoutSettings {
  const screenWidth = Dimensions.get("window").width;

  const chartPadding = 40; // Reserved space for y-axis labels, etc.
  const availableWidth = screenWidth - chartPadding;

  // Base spacing: divide available width by the number of data gaps
  let spacing = availableWidth / (weeksDisplayed + 1);

  // Apply spacing limits
  const minSpacing = 20; // Minimum space between points to avoid cramming
  const maxSpacing = 50; // Prevent overly large gaps when few weeks are shown
  spacing = Math.min(Math.max(spacing, minSpacing), maxSpacing);

  // Font size scales with spacing, but enforce a readable minimum
  const fontSize = Math.max(spacing * 0.3, 8);

  // Margin top can shrink slightly as more weeks are shown
  const marginTop = Math.max(10 - weeksDisplayed * 0.2, 4);

  // Rotate labels if spacing is too tight
  const xAxisLabelRotation = spacing < 30 ? 45 : 0;
  const initialSpacing = Math.max(spacing * 0.7, 10);

  // X-axis left margin: pad more for wider Y-axis labels or when chart is dense
  const xAxisMarginLeft = Math.max(20, 40 - weeksDisplayed * 0.5);

  return {
    xAxisLabelFontSize: fontSize,
    xAxisLabelMarginTop: marginTop,
    spacing,
    initialSpacing,
    xAxisMarginLeft,
    xAxisLabelRotation,
  };
}
