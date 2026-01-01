import { Tabs, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dailyForm"
        options={{
          title: "Checklist",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "checkbox" : "checkbox-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="day"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: "Habits",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                console.log("test");
                router.replace("/habits/habitsOverview"); // Force reset to habits list page
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: "Reminders",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused
                  ? "notifications-circle"
                  : "notifications-circle-outline"
              }
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="habits/[habit]"
        options={{
          href:null,
        }}
      />
      <Tabs.Screen
        name="habits/newHabitForm"
        options={{
          href:null,
        }}
      /> */}
    </Tabs>
  );
}
