import { View, Text, TouchableOpacity } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { useRouter } from "expo-router";
import { progressBarStyles, styles } from "@/constants/stylesheet";
import { Habit } from "@/constants/habit";
import { Submissions } from "@/constants/FormData";
import {
  calculateStatsForPeriod,
  getGoalForDate,
  generateDifferentDaysKey,
  generateConsecutiveKeys,
  habitValueAsInt,
} from "@/components/helper";

export default function createSummary(
  habits: Habit[],
  submissions: Submissions,
  keys: string[],
  router: any,
) {
  let sections: JSX.Element[] = [];
  console.log(keys);
  sections.push(
    <View key={"WeeklyProgressHeader"}>
      <Text style={styles.homeScreenSubtitle}>
        Targets for Week of {keys[keys.length - 1]}
      </Text>
    </View>,
  );
  let stats = calculateStatsForPeriod(habits, submissions, keys);
  habits.forEach((h) => {
    sections.push(showWeeklyProgress(h, stats[h.habitID][0], keys, router));
  });
  return sections;
}

function showWeeklyProgress(
  habit: Habit,
  value: number,
  keys: string[],
  router: any,
) {
  let barValue = 0;
  let barColor = "#CF6679";
  let total = 0;

  if (habit.timeframe === "Daily") {
    //accounts for changes in goals
    keys.forEach((k) => {
      total = total + Number(getGoalForDate(habit, k).goal);
    });
    total = total + Number(habit.goal) * (7 - keys.length);
    barValue = value / total;
  } else if (habit.timeframe === "Weekly") {
    total = Number(habit.goal);
    barValue = value / total;
  }

  if (barValue >= 0.5 && barValue < 0.8) {
    barColor = "#feff5c";
  } else if (barValue >= 0.8 && barValue < 1) {
    barColor = "#58b947";
  } else if (barValue >= 1) {
    barColor = "green";
  }
  if (barValue >= 1) {
    barValue = 1;
  }

  return (
    <View key={"Habit" + habit.habitID + "WeeklyProgress"}>
      <TouchableOpacity onPress={() => router.push(`/habits/${habit.habitID}`)}>
        <View style={styles.row}>
          <Text style={progressBarStyles.progressBarTitle}>
            {habit.prettyPrint}:{" "}
          </Text>
          <Text style={progressBarStyles.progressBarSubtitle}>
            {value}/{habit.timeframe === "Daily" ? total : habit.goal}
          </Text>

          {/* <Text style={progressBarStyles.progressBarSubtitle}>{value}/{(habit.timeframe === "Daily")? total : habit.goal} {(habit.dataType == "boolean")?"day":"minute"}{(habit.goal==="1")? "":"s"}</Text> */}
        </View>
        <ProgressBar
          style={progressBarStyles.progressBarStyle}
          fillStyle={progressBarStyles.progressBarfillStyle}
          progress={barValue}
          color={barColor}
        />
      </TouchableOpacity>
    </View>
  );
}
