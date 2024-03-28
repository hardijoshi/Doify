import React, { useState, useEffect } from 'react';
import { useColorScheme, TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from '../screens/Home';
import New from '../screens/New';
import Health from "../screens/Health";
import Work from "../screens/Work";
import Personal from "../screens/Personal"
import Others from "../screens/Others";
import Settings from "../screens/Settings";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Developer from '../screens/Developer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator()
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
     <LinearGradient
      colors={['#6141AC', '#ba68c8']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  headertxt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10
  },
  headert: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default function AppStack() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
 
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'New') {
              iconName = focused ? 'plus' : 'plus';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog';
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: isDarkMode? '#e1bee7': '#7e57c2',
          tabBarInactiveTintColor: isDarkMode ? '#ccc' : '#888',
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#333' : '#fff',
          },
        })}
      >
        <BottomTab.Screen name='Home' component={HomeWithTopTabs} />
        <BottomTab.Screen
          name='New'
          component={New}
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton
                {...props}
                onPress={() => {
                  props.onPress && props.onPress();
                }}
              >
                <FontAwesome5 name='plus' color={'#fff'} size={30} />
              </CustomTabBarButton>
            ),
          }}
        />
        <BottomTab.Screen name='Settings' component={SettingsStack} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const HomeWithTopTabs = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const lightBackgroundColor = '#f4f4f4';
  const darkBackgroundColor = '#121212';
  const headerTextStyle = [styles.text, isDarkMode ? styles.darkText : null];
  const backgroundColor = colorScheme === 'dark' ? darkBackgroundColor : lightBackgroundColor;
  const [profilePicture, setProfilePicture] = useState(null);

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

  useEffect(() => {
    loadProfilePicture();
  }, []);
  return (
    <View style={[{ flex: 1 }, backgroundColor]}>
      <View style={[styles.headertxt]}>
        <TouchableOpacity>
          <Image source={require('../assets/Images/Doifyt.png')} style={{height:30,width:30,borderRadius: 15}}/>
        </TouchableOpacity>
        <View style={styles.headert}>
          <Text style={headerTextStyle}>Do</Text>
          <Text style={{ color:isDarkMode? '#e1bee7': '#7e57c2', fontSize: 20, fontWeight: 'bold' }}>ify</Text>
        </View>
        <TouchableOpacity>
          <Image source={profilePicture ? profilePicture : require('../assets/Images/pfp2.png')} style={{height:30,width:30,borderRadius: 15}}/>
        </TouchableOpacity>
      </View>
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: isDarkMode ? '#e1bee7' : '#6141AC',
          tabBarInactiveTintColor: isDarkMode ? '#ccc' : '#888',
          tabBarIndicatorStyle: {
            backgroundColor: '#6141AC',
          },
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#333' : '#fff',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarLabelContainerStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
          },
          tabBarLabel: ({ focused, color, size, children }) => (
            <Text
              numberOfLines={1} // Limiting to 1 line
              ellipsizeMode="tail" // Truncate with an ellipsis at the end
              style={{ color, fontSize: size }}
            >
              {children}
            </Text>
          ),
        }}
      >
        {/* <TopTab.Screen name="All" component={Home} /> */}
        <TopTab.Screen name="Work" component={Work} />
        <TopTab.Screen name="Health" component={Health} />
        
        <TopTab.Screen name="Personal" component={Personal} />
        <TopTab.Screen name="Others" component={Others} />
      </TopTab.Navigator>
    </View>
  );
}

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='SettingsScreen' component={Settings}/>
      <Stack.Screen name='Developer' component={Developer}/>
    </Stack.Navigator>
  );
}
