import { Tabs, Stack } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
 
export default function HabitLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
        <Stack.Screen name="habitsOverview" options={{ headerShown: false }} />
        <Stack.Screen name="newHabitForm" options={{ headerShown: false }} />
        <Stack.Screen name="[habit]" />
    </Stack>
  );
}
