import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getData = async () => {
    try {
        const keys : string[] = [...await AsyncStorage.getAllKeys()]
        const keyValuePairs : KeyValuePair[] = [...await AsyncStorage.multiGet(keys)]
        return keyValuePairs
    } catch(e) {
        console.log(e)
    }
    
  };
const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    console.log(e)
  }
}
const DataDisplay = () => {
    
    const [data, setData] = useState<KeyValuePair[]>();

    useEffect(() => {
      const fetchData = async () => {
        const result = await getData();
        // console.log(result)
        setData(result)
      };
  
      fetchData();
    }, []);

    
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.text}>
          {/* null handling */}
            {data ? (
              data.map(pair => {
                return pair[1]
              })) 
              : ("No Data Found")
            }
          </Text>
          <Button onPress={clearAll} title="Clear Storage"/>
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
    },
});
  
export default DataDisplay;