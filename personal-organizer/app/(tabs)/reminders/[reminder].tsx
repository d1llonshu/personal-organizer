
import { SafeAreaView, View,  Text, ScrollView, Pressable, Alert, TouchableHighlight } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams, Stack} from 'expo-router';

import { Reminder } from "@/constants/reminder";
import { styles, buttonColorTrue, buttonColorFalse } from "@/constants/stylesheet"

export default function reminderInfoPage() {
    const router = useRouter();
    const local = useLocalSearchParams<{reminder: string}>();

    return(
            <SafeAreaView style = {styles.safeAreaContainer}>
              <ScrollView style = {styles.formContainer}>
                <Stack.Screen options={{ title: local.reminder }} />
                  <View>
                      {/* {
                        infoSections
                      } */}

                  </View>
               
            </ScrollView>
          </SafeAreaView>
        )
}