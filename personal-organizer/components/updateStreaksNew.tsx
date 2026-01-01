import { View, Text } from "react-native";

import {
  Habit,
  dataTypes,
  timeframes,
  categories,
  keyPrettyPrint,
} from "@/constants/habit";
import { styles, progressBarStyles } from "@/constants/stylesheet";
import { FormData, Submissions } from "@/constants/FormData";

import {
  calculateStatsForPeriod,
  generateDifferentDaysKey,
  generateConsecutiveKeys,
  habitValueAsInt,
} from "@/components/helper";

export default function printOngoingStreaks(
  habits: Habit[],
  submissions: Submissions,
) {
  let sections: JSX.Element[] = [];

  if (habits && submissions) {
    sections.push(
      <View key="StreakHomePageHeader">
        <Text style={styles.homeScreenSubtitle}>Current Streaks</Text>
      </View>,
    );
    let streaks = calculateStreaks(habits, submissions);

    for (let i = 0; i < streaks.length; i++) {
      if (streaks[i] != 0) {
        if (habits[i].timeframe == "Daily") {
          sections.push(
            <View key={habits[i].habitID + "StreakPrint"} style={styles.row}>
              <Text style={progressBarStyles.progressBarTitle}>
                {habits[i].prettyPrint}:{" "}
              </Text>
              <Text style={progressBarStyles.progressBarSubtitle}>
                {streaks[i]} {streaks[i] == 1 ? "day" : "days"}
              </Text>
            </View>,
          );
        }
        if (habits[i].timeframe == "Weekly") {
          sections.push(
            <View key={habits[i].habitID + "StreakPrint"} style={styles.row}>
              <Text style={progressBarStyles.progressBarTitle}>
                {habits[i].prettyPrint}:{" "}
              </Text>
              <Text style={progressBarStyles.progressBarSubtitle}>
                {streaks[i]} {streaks[i] == 1 ? "week" : "weeks"}
              </Text>
            </View>,
          );
        }
      }
    }
    return sections;
  } else {
    //throw Error("Habits or submissions missing")
    sections.push(
      <View key="StreakHomePageHeader">
        <Text style={styles.homeScreenSubtitle}>
          No Streaks, add some habits to get started!{" "}
        </Text>
      </View>,
    );
    return sections;
  }
}
function calculateStreaks(habits: Habit[], submissions: Submissions): number[] {
  let dateKeys = Object.keys(submissions!).reverse(); //assumes the submissions are sorted by date, newest first
  // console.log("--------------------------------------------------------");
  if (submissions && habits && dateKeys.length >= 2) {
    let streakCount: number[] = [];

    // can we infer that dateKeys[0] is today as the form updates when the date is changed (?)

    let yesterdaysKey = generateDifferentDaysKey(dateKeys[0], 1);
    // let yesterdaysKey = generateDifferentDaysKey("2025/1/13", 1);
    let yesterDay = new Date(yesterdaysKey).getUTCDay();

    // since this may be tallied while the week is ongoing, we can't count weekly targets that aren't complete yet
    // so, generate keys needed to reach first sunday
    let keysBeforeFirstSunday = generateConsecutiveKeys(
      yesterdaysKey,
      yesterDay,
    );

    let stats = calculateStatsForPeriod(
      habits,
      submissions,
      keysBeforeFirstSunday,
    );
    // console.log("all keys: " + dateKeys)
    // console.log("Keys Before Sunday: " + keysBeforeFirstSunday);
    // console.log(stats);
    let reqForDailyStreak = keysBeforeFirstSunday.length;
    let stillCounting: string[] = []; // array of habit.keyNames that are still ongoing, either weekly or daily
    let sundayKey = generateDifferentDaysKey(yesterdaysKey, yesterDay); // most recent sunday to indicate a end full week/start point for counting backwards
    // console.log("streak req: " + reqForDailyStreak);
    habits.forEach((h) => {
      //if the habit either has an ongoing streak or has a weekly goal, add it to still going

      if (
        h.timeframe === "Daily" &&
        stats[h.habitID][1] === reqForDailyStreak
      ) {
        stillCounting.push(h.habitID);
      } else if (h.timeframe === "Weekly") {
        //always adds weekly goals because the only calculations done so far only accounts for an incomplete week
        stillCounting.push(h.habitID);
      }
    });
    // console.log("Still Counting: " + stillCounting);
    while (stillCounting.length > 0) {
      let oneWeeksKeys = generateConsecutiveKeys(sundayKey, 7);
      let oneWeekStats = calculateStatsForPeriod(
        habits,
        submissions,
        oneWeeksKeys,
      );
      // console.log("WEEK: " + oneWeeksKeys);
      // console.log("ONE WEEK: " + JSON.stringify(oneWeekStats));

      reqForDailyStreak = reqForDailyStreak + 7;

      habits.forEach((h) => {
        // 0 = sum for week
        // 1 = streak length
        stats[h.habitID][0] = stats[h.habitID][0] + oneWeekStats[h.habitID][0];
        if (stillCounting.includes(h.habitID)) {
          //if it was in stillCounting, increment the streak and see if it still qualifies
          stats[h.habitID][1] =
            stats[h.habitID][1] + oneWeekStats[h.habitID][1];
          if (h.timeframe === "Weekly") {
            //if after adding the new stats, the value is less than int(req/7) the streak is over
            if (stats[h.habitID][1] < Math.trunc(reqForDailyStreak / 7)) {
              stillCounting = stillCounting.filter(
                (ongoingHabit) => ongoingHabit !== h.habitID,
              );
            }
          } else if (h.timeframe === "Daily") {
            if (stats[h.habitID][1] < reqForDailyStreak) {
              stillCounting = stillCounting.filter(
                (ongoingHabit) => ongoingHabit !== h.habitID,
              );
            }
          } else {
            console.log(
              "Something went wrong... timeframe not daily or weekly",
            );
          }
        }
      });
      // console.log("STATS: " + JSON.stringify(stats));
      // console.log("Still Counting: " + stillCounting);
      // console.log("********************************************************");
      sundayKey = generateDifferentDaysKey(oneWeeksKeys[6], 1); //get the key from the day before the last day in array
    }

    habits.forEach((h) => {
      streakCount.push(stats[h.habitID][1]);
    });

    return streakCount;
  }
  return [];
}
