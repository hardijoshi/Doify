import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';

export default function Login({ navigation }) {
  const { signIn, resetPassword,message,clearMessage } = useContext(AuthContext);
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  return (
    <View style={styles.container}>
      <View style={styles.imgcontainer}>
        {/* <Image source={require('../assets/Images/login.png')} style={styles.img} /> */}
      </View>
      <Text style={{ fontSize: 28, color: '#fff', marginBottom: 30, fontFamily: 'PlayfairDisplay-Bold' }}>
        Login
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <FontAwesome5 name='envelope' size={20} color={'#0B666A'} solid />
        </View>
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          keyboardType='email-address'
          value={email}
          onChangeText={(text) => setEmail(text)} 
          placeholderTextColor={'#fff'}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <FontAwesome5 name='lock' size={20} color={'#0B666A'} solid />
        </View>
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)} 
          placeholderTextColor={'#fff'}
        />
      </View>
      <TouchableOpacity style={styles.forgotPassword} onPress={() => resetPassword(email)}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.messageContainer}>
        {message && (
          <View style={styles.messageBox}>
            <FontAwesome5 name="exclamation-circle" size={20} color="red" style={styles.icon} />
            <Text style={styles.messageText}>{message}</Text>
            <TouchableOpacity onPress={clearMessage}>
              <FontAwesome5 name="times-circle" size={20} color="red" style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.btncontainer}>
        <TouchableOpacity onPress={() => signIn(email,password)}>
          <LinearGradient colors={['#0B666A', '#0B666A']} style={styles.btn}>
            <Text style={styles.btntxt}>Sign-In</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.registerTextContainer}>
        <Text style={styles.registerText}>New to app? </Text>
        <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLinkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgcontainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  img: {
    height: 250,
    width: 250,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    padding: 8,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
  },
  btncontainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    height: 40,
    width: 280,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntxt: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'PlayfairDisplay-Regular'
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontFamily: 'PlayfairDisplay-Regular'
  },
  registerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 30
  },
  registerText: {
    color: '#fff',
    fontFamily: 'PlayfairDisplay-Regular'
  },
  registerLink: {
    marginLeft: 10,
  },
  registerLinkText: {
    color: '#0B666A',
    textDecorationLine: 'underline' 
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  messageBox: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  messageText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  closeIcon: {
    marginLeft: 10,
  },
});