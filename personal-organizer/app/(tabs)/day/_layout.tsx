import { Tabs, Stack } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
 
export default function DayLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
        <Stack.Screen name="daysOverview" options={{ headerShown: false }} />
        <Stack.Screen name="[day]" options={{ }}/>
    </Stack>
  );
}
