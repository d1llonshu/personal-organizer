import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { MMKV, useMMKVObject } from "react-native-mmkv";

import { Reminder } from "@/constants/reminder";
import {
  styles,
  buttonColorTrue,
  buttonColorFalse,
} from "@/constants/stylesheet";
import { Surface } from "react-native-paper";

export default function reminderInfoPage() {
  const router = useRouter();
  const local = useLocalSearchParams<{ reminder: string }>();
  const [reminderArray, setReminderArray] =
    useMMKVObject<Reminder[]>("reminderArray");
  if (reminderArray == undefined) {
    setReminderArray([]);
  }
  const [reminderIDCount, setReminderIDCount] =
    useMMKVObject<number>("reminderIDCount");
  if (reminderIDCount == undefined) {
    setReminderIDCount(0);
  }
  const [currentReminder, setCurrentReminder] = useState<Reminder>();
  const [sections, setSections] = useState<JSX.Element[]>([]);

  useEffect(() => {
    reminderArray?.forEach((r) => {
      if (r.notificationID === local.reminder) {
        setCurrentReminder(r);
      }
    });
  }, []);

  useEffect(() => {
    let newSections: JSX.Element[] = [];
    newSections.push(
      <View key={"info"} style={styles.row}>
        <Text style={styles.habitPageSubtitle}>{currentReminder?.title}</Text>
      </View>,
    );
    setSections(newSections);
  }, [currentReminder]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <Stack.Screen options={{ title: currentReminder?.title }} />
        <Surface style={styles.homeScreenSurface} elevation={1}>
          {sections}
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}
