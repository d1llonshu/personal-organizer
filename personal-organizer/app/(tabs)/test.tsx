import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { storage } from '../../constants/storage';



const TestScreen = () => {
  const [test1, setTest1] = useState('');
  const [test2, setTest2] = useState('');
  const [test3, setTest3] = useState('');

  useEffect(() => {
    const fetchData = () => {
      const value1 = storage.getString('test1');
      const value2 = storage.getString('test2');
      const value3 = storage.getString('test3');

      if (value1) setTest1(value1);
      if (value2) setTest2(value2);
      if (value3) setTest3(value3);
    };

    fetchData();
  }, []);

  const saveData = () => {
    storage.set('test1', test1);
    storage.set('test2', test2);
    storage.set('test3', test3);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Test1"
        value={test1}
        onChangeText={setTest1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Test2"
        value={test2}
        onChangeText={setTest2}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Test3"
        value={test3}
        onChangeText={setTest3}
      />
      <Button title="Save" onPress={saveData} />
      <Text>Test1: {test1}</Text>
      <Text>Test2: {test2}</Text>
      <Text>Test3: {test3}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
});

export default TestScreen;