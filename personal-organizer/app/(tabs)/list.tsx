import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { storage } from '../../constants/storage';

const ListScreen = () => {
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const keys = storage.getAllKeys();
      const vals: string[] = [];
      for (let i = 0; i < keys.length; i++) {
        const value = storage.getString(keys[i]);
        if (value !== undefined) {
          vals.push(value);
        }
      }
      setValues(vals);
    };

    fetchData();
  }, []);

  const saveData = () => {
    storage.set(name, data);
    // Refresh the list after saving new data
    const keys = storage.getAllKeys();
    const vals: string[] = [];
    for (let i = 0; i < keys.length; i++) {
      const value = storage.getString(keys[i]);
      if (value !== undefined) {
        vals.push(value);
      }
    }
    setValues(vals);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />
      <Button title="Save" onPress={saveData} />
      <FlatList
        data={values}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ListScreen;