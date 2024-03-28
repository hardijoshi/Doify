import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const New = ({ navigation, addTask, updateTasks }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [selectedCategory, setSelectedCategory] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const isFocused = useIsFocused();
  const [pickerKey, setPickerKey] = useState(Date.now());

  const headerTextStyle = [styles.text, isDarkMode ? styles.darkText : styles.lightText];

  useEffect(() => {
    setSelectedCategory('');
    setPickerKey(Date.now());

    // Check for tasks deletion at 12:00 AM
    const clearTasksAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const timeUntilMidnight = midnight - now;

      setTimeout(() => {
        clearTasks();
      }, timeUntilMidnight);
    };

    // Call the function to clear tasks at 12:00 AM
    clearTasksAtMidnight();

    // Clear tasks function
    const clearTasks = async () => {
      try {
        await AsyncStorage.removeItem('tasks');
        // Update the tasks state in the parent component if needed
        if (updateTasks) {
          updateTasks([]);
        }
      } catch (error) {
        console.error('Error clearing tasks:', error);
      }
    };

    // Set interval to clear tasks daily
    const intervalId = setInterval(clearTasksAtMidnight, 24 * 60 * 60 * 1000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, [isFocused, updateTasks]);

  const handleAddTask = async () => {
    let taskInfo = null;

    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    if (updateTasks) {
      updateTasks(updatedTasks => [...updatedTasks, taskInfo]); // Update tasks state with new task
    }

    taskInfo = {
      category: selectedCategory,
      taskName: newTaskName,
    };

    try {
      const existingTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || {};
      const updatedTasks = {
        ...existingTasks,
        [selectedCategory]: [...(existingTasks[selectedCategory] || []), taskInfo],
      };
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error storing task:', error);
    }

    navigation.navigate(selectedCategory, { taskInfo });

    setSelectedCategory('');
    setNewTaskName('');
    setPickerKey(Date.now());
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f4f4f4' }]}>
      <View style={{ marginTop: 15 }}>
        <View style={[styles.headertxt]}>
          <View style={styles.headert}>
            <Text style={[headerTextStyle]}>Add </Text>
            <Text style={{ color: isDarkMode ? '#e1bee7' : '#7e57c2', fontSize: 20, fontWeight: 'bold' }}>Task</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Select Category:</Text>
        <RNPickerSelect
          key={pickerKey.toString()}
          style={{
            ...pickerSelectStyles,
            inputAndroid: { color: isDarkMode ? '#fff' : '#000', borderWidth: 1, borderColor: isDarkMode ? '#fff' : '#000', borderRadius: 10 },
            iconContainer: { right: 10 },
          }}
          placeholder={{ label: 'Category', value: null, color: isDarkMode ? '#fff' : '#000' }}
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          items={[
            { label: 'Work', value: 'Work' },
            { label: 'Health', value: 'Health' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Others', value: 'Others' },
          ]}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <View
              style={{
                backgroundColor: 'transparent',
                borderTopWidth: 8,
                borderTopColor: isDarkMode ? '#fff' : 'gray',
                borderRightWidth: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightColor: 'transparent',
                borderLeftWidth: 10,
                borderLeftColor: 'transparent',
                width: 10,
                marginTop: '100%',
                height: 0,
              }}
            />
          )}
        />

        <Text style={[styles.labelt, { color: isDarkMode ? '#fff' : '#000' }]}>Task Name:</Text>
        <TextInput
          style={[styles.input, { color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#fff' : 'black' }]}
          placeholder="Enter task name"
          placeholderTextColor={isDarkMode ? '#fff' : '#000'}
          value={newTaskName}
          onChangeText={(text) => setNewTaskName(text)}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <LinearGradient colors={isDarkMode ? ['#ce93d8', '#ba68c8'] : ['#6141AC', '#8B5AC2']} style={styles.button}>
            <Text style={styles.buttonText}>Add Task</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20
  },
  labelt:{
    fontSize: 16,
    marginBottom: -10,
    marginTop: 50
  },
  input: {
    height: 52,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 9
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  gradientHeader: {
    height: 80,
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  headcard: {
    height: 80,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  inputContainer:{
    flex:1,
    padding: 20
  },
  headert: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headertxt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  darkText: {
    color: 'white',
  },
  lightText: {
    color: 'black',
  },
  
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingRight: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  
});

export default New;
