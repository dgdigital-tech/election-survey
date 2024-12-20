import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, Alert, View} from 'react-native';
import axios from 'axios';
import InputBox from '../components/InputBox';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import {ScrollView} from 'react-native-gesture-handler';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    console.log(name, email, password, phone);
    // Validate inputs
    if (!name || !email || !password || !confirmPassword || !phone) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.218.108:5000/register',
        {
          email,
          name,
          password,
          phone,
        },
      );

      console.log(response);

      if (response.data.success) {
        Alert.alert('Success', 'You have successfully registered!');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert(
          'Registration Failed',
          response.data.message || 'Try again.',
        );
      }
    } catch (error) {
      console.error('Registration Error:', error.response || error.message);
      Alert.alert(
        'Error',
        'An error occurred during registration. Please check your API URL or try again later.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appNameContainer}>
        <Text style={styles.title}> Super Admin Register</Text>

        <View style={styles.underline} />
      </View>
      <InputBox
        label="Full Name"
        placeholder="Enter your full name"
        value={name}
        setValue={setName}
        iconname="person"
      />
      <InputBox
        label="Email"
        placeholder="Enter your email"
        value={email}
        setValue={setEmail}
        iconname="email"
        keyboardType="email-address"
      />
      <InputBox
        label="Phone Number"
        placeholder="Enter your phone number"
        value={phone}
        setValue={setPhone}
        iconname="phone"
        keyboardType="phone-pad"
      />
      <InputBox
        label="Password"
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
        iconname="lock"
        secureTextEntry={true}
      />
      <InputBox
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        iconname="lock"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={isLoading}>
        <Text style={styles.registerButtonText}>
          {isLoading ? 'Registering...' : 'REGISTER'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={handleLoginNavigation}>
          Click here to Login
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  appNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp(3),
  },
  title: {
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  underline: {
    bottom: hp(1.4),
    width: wp(50),
    height: hp(0.3),
    backgroundColor: '#223265',
  },
  registerButton: {
    backgroundColor: '#223265',
    width: wp(70),
    alignSelf: 'center',
    paddingVertical: hp(1.5),
    borderRadius: 30,
    alignItems: 'center',
    marginTop: hp(5),
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
  loginLink: {
    color: '#27aae1',
  },
});

export default RegisterScreen;
