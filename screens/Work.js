import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';

const Work = ({ route }) => {
  const [tasks, setTasks] = useState([]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const textColor = isDarkMode ? '#ffffff' : 'grey';
  const backgroundColor = isDarkMode ? '#121212' : '#f4f4f4';
  const [completedTasks, setCompletedTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          const workTasks = parsedTasks['Work'] || [];
          setTasks(workTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [route.params]);
  
  useEffect(() => {
    const clearTasksAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // Set time to midnight
      const timeUntilMidnight = midnight - now;
  
      console.log("Time until midnight:", timeUntilMidnight);
  
      setTimeout(() => {
        console.log("Clearing tasks at midnight...");
        // Clear tasks
        AsyncStorage.removeItem('tasks')
          .then(() => {
            console.log("Tasks cleared successfully.");
            setTasks([]);
            setCompletedTasks([]);
          })
          .catch(error => {
            console.error('Error removing tasks:', error);
          });
      }, timeUntilMidnight);
    };
  
    clearTasksAtMidnight();
  }, []);
  
  // Function to mark a task as completed
  // Function to mark a task as completed
const markAsCompleted = async (index) => {
  const updatedTasks = [...tasks];
  const completedTask = updatedTasks.splice(index, 1)[0];
  setTasks(updatedTasks);
  setCompletedTasks(prevState => [...prevState, completedTask]);
  
  // Update storage with completed tasks
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify({ 'Others': updatedTasks, 'Completed': [...completedTasks, completedTask] }));
  } catch (error) {
    console.error('Error marking task as completed:', error);
  }
};


  // Function to delete a task
 // Function to delete a task
const deleteTask = async (index) => {
  const updatedTasks = [...tasks];
  updatedTasks.splice(index, 1);
  setTasks(updatedTasks);
  
  // Remove the deleted task from storage
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify({ 'Others': updatedTasks, 'Completed': completedTasks }));
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
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
                {!item.completed && (
                  <TouchableOpacity onPress={() => deleteTask(index)}>
                    <FontAwesome5 name='check' color='#81c784' size={20} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image source={require('../assets/Images/Workbg.png')} style={styles.rudriimg} />
            <Text style={[styles.txt, { color: textColor }]}>No tasks to display</Text>
            <Text style={[styles.txt, { color: textColor }]}>Click on + to create your Task</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  content: {
    flex: 1,
    width: '100%',
    // paddingHorizontal: 20,
    // paddingTop: 20,
  },
  rudriimg: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  taskItem: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 30,
    margin: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6141AC',
  },
  emptyContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Work;
