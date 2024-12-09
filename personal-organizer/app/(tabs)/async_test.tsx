import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getData = async () => {
    try {
        const keys : string[] = [...await AsyncStorage.getAllKeys()]
        console.log(keys)
        //const result = await AsyncStorage.multiGet(keys);
        return keys
    } catch(e) {
        console.log(e)
    }
    
  };
const DataDisplay = () => {
    
    const [data, setData] = useState<string[]>();
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await getData();
        console.log(result)
        setData(result)
      };
  
      fetchData();
    }, []);
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {data ? JSON.stringify(data) : 'No data found'}
        </Text>
      </View>
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