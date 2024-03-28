import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image, ScrollView, useColorScheme } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Developer() {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';


  return (
    <ScrollView>
      <View style={[styles.container,{backgroundColor: isDarkMode? '#212121': '#f4f4f4'}]}>
        <Image source={require('../assets/Images/HDJ.jpg')} style={styles.image} />

        <Text style={[styles.title,{color: isDarkMode? '#e1bee7':'#7e57c2'}]}>Developer</Text>
        <Text style={[styles.description, {color: isDarkMode? '#bdbdbd':'#000'}]}>
          Hello, I'm Hardi Joshi, a Computer Science and Engineering (IoT) student at G. H. Patel College of Engineering & Technology. I take immense pride in presenting this application, which I've developed using React Native. If you would like to get in touch for inquiries, collaborations, or any technical assistance, you can reach out through LinkedIn or Email. Feel free to connect or drop an email, and I'll be delighted to assist you with any questions or opportunities you have in mind. I look forward to hearing from you!
        </Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={[styles.iconButton,{backgroundColor: isDarkMode? '#e1bee7':'#7e57c2'}]}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/hardi-joshi/')}
          >
            <FontAwesome5 name="linkedin-in" size={20} color= {isDarkMode? '#000':'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton,{backgroundColor: isDarkMode? '#e1bee7':'#7e57c2'}]}
            onPress={() => Linking.openURL('mailto:hdjoshi2106@gmail.com?subject=Developer Contact&body=')}
          >
            <FontAwesome5 name="envelope" size={20} color= {isDarkMode? '#000':'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Arial', 
    fontWeight: '800'
  },
  description: {
    fontSize: 16,
    color: '#333', 
    textAlign: 'justify',
    paddingHorizontal: 10, 
    fontFamily: 'Arial', 
    lineHeight: 24, 
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginVertical: 15, 
  },
  iconButton: {
    backgroundColor: '#000', 
    padding: 12,
    borderRadius: 25, 
    marginHorizontal: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
