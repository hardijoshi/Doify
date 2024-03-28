import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, FlatList, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import New from './New';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation, route }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const textColor = isDarkMode ? '#ffffff' : 'grey';
  const backgroundColor = isDarkMode ? '#121212' : '#f4f4f4';
  const [completedTasks, setCompletedTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || {};
        const allTasks = Object.values(storedTasks).flat();
        setTasks(allTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, []);

  const saveTasksToStorage = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const markAsCompleted = (taskIndex) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(taskIndex, 1)[0];
    setTasks(updatedTasks);
    setCompletedTasks(prevState => [...prevState, completedTask]);
    saveTasksToStorage(updatedTasks);
  };

  const deleteTask = (taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const hideModal = () => {
    setShowModal(false);
    navigation.setParams({ showAddTaskModal: false });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.taskItem, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
              onPress={() => markAsCompleted(index)}
            >
              <Text style={[styles.taskName, { color: isDarkMode ? '#e1bee7' : '#6141AC' }]}>
                 {item.taskName}
              </Text>
              <TouchableOpacity onPress={() => deleteTask(index)}>
                <FontAwesome5 name='check' color={isDarkMode? '#81c784':'#81c784'} size={20} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.noTasksContainer}>
          <Image source={require('../assets/Images/Home.png')} style={styles.noTasksIcon} />
          <Text style={[styles.noTasksText, { color: textColor }]}>No tasks to display</Text>
          <Text style={[styles.noTasksText, { color: textColor }]}>Click on + to create a new task</Text>
        </View>
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        onRequestClose={hideModal}
      >
        <New 
          navigation={navigation} 
          hideModal={hideModal} 
          addTask={addTask} 
          updateTasks={setTasks} // Pass updateTasks function as prop
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 30,
    margin: 5,
    marginHorizontal: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6141AC'
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noTasksIcon: {
    width: 250,
    height: 250,
    marginBottom: 15,
  },
  noTasksText: {
    fontSize: 15,
    textAlign: 'center',
  },
});
