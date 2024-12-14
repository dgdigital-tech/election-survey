import React, {useState, useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet, Alert, View} from 'react-native';
import axios from 'axios';
import InputBox from '../components/InputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://192.168.218.108:5000/signin', {
        email,
        password,
      });

      const {token, userdata} = response.data;

      if (token && userdata) {
        await AsyncStorage.setItem('Authtoken', token);
        await AsyncStorage.setItem('userId', userdata._id);

        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem('Authtoken');
        if (token) navigation.replace('Home');
      };

      checkToken();
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Admin Login</Text>
      <Text style={styles.appName}>Welcome Again</Text>

      <InputBox
        label="Email"
        placeholder="Enter your email"
        value={email}
        setValue={setEmail}
      />
      <InputBox
        label="Password"
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t Have an Account?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate('RegisterScreen')}>
          Click here to Register
        </Text>
      </Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>
          {isLoading ? 'Logging in...' : 'LOGIN'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  appName: {
    fontSize: 40,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Roboto-Black',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#04238E',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#944dff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
  },
  registerLink: {
    color: '#04238E',
  },
});

export default LoginScreen;
