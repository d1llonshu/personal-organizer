import { storage } from "@/constants/storage";
import { formData, formKeysMinusDate } from "@/constants/old_files/oldFormData";
import { MMKV, useMMKVObject } from "react-native-mmkv";
import { streakData } from "@/constants/streaks";

export default function updateStreaks(
  streaks: streakData[],
  submission: formData,
) {
  if (streaks.length == 0) {
    throw new Error("No streak data found for updateStreaks");
  }

  let today = new Date();
  let { todaysKey, yesterdaysKey } = getKeysForDate(today);

  //get data for today
  let props = formKeysMinusDate;

  let updatedStreakData = streaks.map((streakData) => {
    let todaysEntry = submission[streakData.name as keyof formData];
    console.log(streakData.name);
    console.log(submission[streakData.name as keyof formData]);
    let completed = checkIfCompletedToday(todaysEntry);
    if (streakData.mostRecentDate == todaysKey) {
      //if its already been updated to account for today, no changes are needed
      //mostRecentDate will only equal todaysKey if task has been completed before this submission
      return streakData;
    } else {
      if (streakData.mostRecentDate == yesterdaysKey && completed) {
        //case - if you've completed it and most recent was yesterday
        //outcome - streak+1
        let newData: streakData = {
          name: streakData.name,
          currentStreak: streakData.currentStreak + 1,
          longestStreak:
            streakData.currentStreak + 1 > streakData.longestStreak
              ? streakData.currentStreak + 1
              : streakData.longestStreak,
          mostRecentDate: todaysKey,
        };
        return newData;
      } else if (streakData.mostRecentDate != yesterdaysKey && completed) {
        //case - if you've completed it and most recent was not yesterday or today
        //outcome - reset current streak to 1
        let newData: streakData = {
          name: streakData.name,
          currentStreak: 1,
          longestStreak: streakData.longestStreak,
          mostRecentDate: todaysKey,
        };
        return newData;
      } else if (streakData.mostRecentDate != yesterdaysKey && !completed) {
        //case - if you've not completed it and most recent was not yesterday or today (basically its been > 1 day since last completed)
        //outcome - reset current streak to 0
        let newData: streakData = {
          name: streakData.name,
          currentStreak: 0,
          longestStreak: streakData.longestStreak,
          mostRecentDate: streakData.mostRecentDate,
        };
        return newData;
      } else {
        //case if you've not completed it and most recent was yesterday's key
        //outcome - do not update in case its done later in the day
        return streakData;
      }
    }
  });
  return updatedStreakData;
}

function getKeysForDate(today: Date): {
  todaysKey: string;
  yesterdaysKey: string;
} {
  let todaysKey: string =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

  //create yesterday's key
  let yesterdaysKey: string =
    today.getFullYear() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    (today.getDate() - 1);
  if (today.getDate() - 1 == 0) {
    //if its the first of the month
    let daysInLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    if (today.getMonth() == 0) {
      //if its january
      yesterdaysKey = today.getFullYear() - 1 + "/" + 12 + "/" + 31;
    } else {
      //any other month
      yesterdaysKey =
        today.getFullYear() + "/" + today.getMonth() + "/" + daysInLastMonth;
    }
  }
  return { todaysKey, yesterdaysKey };
}

function checkIfCompletedToday(entry: any) {
  if (typeof entry == "boolean") {
    return entry;
  } else if (typeof entry == "number") {
    return entry > 0;
  } else {
    throw new Error(
      "Unsupported type for checkIfCompletedToday for updating streaks: " +
        typeof entry,
    );
  }
}
