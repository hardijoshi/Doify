import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const UserNameModal = ({ visible, onSubmit, onClose }) => {
  const [newName, setNewName] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleSubmit = async () => {
    try {
      // Save the user's name to AsyncStorage
      await AsyncStorage.setItem('userName', newName);
      onSubmit(newName);
      onClose();
    } catch (error) {
      console.error('Error saving user name:', error);
    }
  };

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim, visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Enter new name"
            placeholderTextColor={'#000'}
            onChangeText={setNewName}
            value={newName}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 250,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#e1bee7',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#e1bee7',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserNameModal;
