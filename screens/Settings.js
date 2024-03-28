import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme, Image,Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserNameModal from './UserNameModal'; 

const Settings = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState('Enter Name');
  const headerTextStyle = [styles.text, isDarkMode ? styles.darkText : styles.lightText];
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Load profile picture and username from AsyncStorage
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedProfilePicture = await AsyncStorage.getItem('profilePicture');
      const savedUserName = await AsyncStorage.getItem('userName');
      if (savedProfilePicture) {
        setProfilePicture({ uri: savedProfilePicture });
      }
      if (savedUserName) {
        setUserName(savedUserName);
      } else {
        setUserName('Enter Name'); // Set default username if none is saved
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      if (profilePicture) {
        await AsyncStorage.setItem('profilePicture', profilePicture.uri);
      }
      if (userName) {
        await AsyncStorage.setItem('userName', userName);
      }
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  const openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setProfilePicture({ uri: image.path });
      await saveProfilePicture(image.path); // Save the updated profile picture URI to AsyncStorage
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
    }
  };
  
  // Function to save the profile picture URI to AsyncStorage
  const saveProfilePicture = async (uri) => {
    try {
      await AsyncStorage.setItem('profilePicture', uri);
      console.log('Profile picture saved successfully');
    } catch (error) {
      console.log('Error saving profile picture:', error);
    }
  };
  
  // Load profile picture from AsyncStorage on component mount
  useEffect(() => {
    loadProfilePicture();
  }, []);
  
  // Function to load the profile picture URI from AsyncStorage
  const loadProfilePicture = async () => {
    try {
      const savedProfilePicture = await AsyncStorage.getItem('profilePicture');
      if (savedProfilePicture) {
        setProfilePicture({ uri: savedProfilePicture });
      }
    } catch (error) {
      console.log('Error loading profile picture:', error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEditUserName = () => {
    // Implement functionality to open modal for editing username
    toggleModal();
  };

  const handleSubmitUserName = async (newName) => {
    try {
      setUserName(newName); // Update the userName state
      await AsyncStorage.setItem('userName', newName); // Save the updated userName to AsyncStorage
      console.log('Username saved successfully:', newName);
    } catch (error) {
      console.log('Error saving username:', error);
    }
  };

  return (
    <View style={styles.container}>
      <UserNameModal
        visible={isModalVisible}
        onSubmit={handleSubmitUserName}
        onClose={toggleModal}
      />
      <View style={{ marginTop: 15 }}>
        <View style={[styles.headertxt]}>
          <View style={styles.headert}>
            <Text style={[headerTextStyle]}>Sett</Text>
            <Text style={{ color: isDarkMode ? '#e1bee7' : '#7e57c2', fontSize: 20, fontWeight: 'bold' }}>ings</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Image source={profilePicture ? profilePicture : require('../assets/Images/pfp.png')} style={styles.profilePicture} />
        <TouchableOpacity style={[styles.uploadIcon, { backgroundColor: isDarkMode ? '#e1bee7' : '#6141AC' }]} onPress={openGallery}>
          <FontAwesome5 name="image" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.usrContainer}>
        <FontAwesome5 name='user' size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} style={{ marginRight: 10 }} />
        <View style={styles.nameContainer}>
          <Text style={[styles.username, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Username</Text>
          <Text style={{ color: isDarkMode ? '#e1bee7' : '#6141ac' }}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.name} onPress={handleEditUserName}>
          <FontAwesome5 name='pen' size={15} color={isDarkMode ? '#e1bee7' : '#6141ac'} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Developer')} style={styles.usrContainer} >
        <View style={[styles.usrContainer, { marginTop: 1 }]}>
          <FontAwesome5 name='laptop-code' size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} style={{ marginRight: 10 }} />
          <View style={styles.nameContainer}>
            <Text style={[styles.username, { color: colorScheme === 'dark' ? '#fff' : '#000', marginTop: 5 }]}>About Developer</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.usrContainer}>
        <FontAwesome5 name='share' size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} style={{ marginRight: 10 }} />
        <View style={styles.nameContainer}>
          <Text style={[styles.username, { color: colorScheme === 'dark' ? '#fff' : '#000', marginTop: 5 }]}>Love it? Share it!</Text>
        </View>
      </View>
      <View style={styles.usrContainer}>
        <FontAwesome5 name='heart' size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} style={{ marginRight: 10 }} />
        <View style={styles.nameContainer}>
          <Text style={[styles.username, { color: colorScheme === 'dark' ? '#fff' : '#000', marginTop: 5 }]}>Write Review</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:hdjoshi2106@gmail.com?subject=Suggestion/Feedback Contact&body=')} style={styles.usrContainer}>
        <View style={[styles.usrContainer, { marginTop: 1 }]}>
          <FontAwesome5 name='lightbulb' size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} style={{ marginRight: 10 }} />
          <View style={styles.nameContainer}>
            <Text style={[styles.username, { color: colorScheme === 'dark' ? '#fff' : '#000', marginTop: 5 }]}>Suggestion/Feedback</Text>
          </View>
        </View>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    position: 'relative', // Added to allow absolute positioning of the icon
    marginTop: 35
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  uploadIcon: {
    position: 'absolute', // Position the icon absolutely
    bottom: 25,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e1bee7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  usrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  username: {
    fontSize: 15,
    color: '#555',
    marginTop: 10
  },
  editIconContainer: {
    marginLeft: 'auto',
    padding: 5,
  },
  name: {
    fontSize: 14,
    color: '#81c784',
    marginTop: 5,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 5
  },
});

export default Settings;
