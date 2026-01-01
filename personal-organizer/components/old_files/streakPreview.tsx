import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
} from "react-native";

import { styles } from "@/constants/stylesheet";
import { streakData } from "@/constants/streaks";
import { formKeysMinusDatePretty } from "@/constants/old_files/oldFormData";
import { CustomButton } from "@/components/customButton";

export default function streakPreview(streaks: streakData[]) {
  return (
    <View style={styles.container}>
      <Text style={styles.homeScreenSubtitle}>Ongoing Streaks</Text>

      {sortStreakData(streaks)?.map((d) => (
        <Text style={styles.regularText}>
          {
            formKeysMinusDatePretty[
              d!.name as keyof typeof formKeysMinusDatePretty
            ]
          }
          : {d!.currentStreak} {d!.currentStreak > 1 ? "days" : "day"}
        </Text>
      ))}
    </View>
  );
}

function getOngoingStreaks(streaks: streakData[]) {
  let ongoing = streaks.map((d) => {
    if (d.currentStreak >= 1) {
      return d;
    }
  });

  return ongoing;
}

function sortStreakData(arr: streakData[]): streakData[] {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(sortStreakData(left), sortStreakData(right));
}

function merge(left: any[], right: any[]): any[] {
  let result: any[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].currentStreak > right[rightIndex].currentStreak) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
