import { Tabs, Stack } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
 
export default function RemindersLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
        <Stack.Screen name="remindersOverview" options={{ headerShown: false }} />
        <Stack.Screen name="newReminderForm" options={{ headerTitle: "New Reminder" }}/>
    </Stack>
  );
}
