import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, Alert, View} from 'react-native';
import axios from 'axios';
import InputBox from '../components/InputBox';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import TextureBackground from '../assets/Icons/TextureBackground.svg';
import {ScrollView} from 'react-native-gesture-handler';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.svgWrapper}>
        <TextureBackground
          width="190%"
          height="125%"
          style={styles.svgBackground}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Super Admin Register</Text>
        <View style={styles.underline} />

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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: wp(5),
    backgroundColor: '#fff',
  },
  svgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Keeps the background behind content
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: -157,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(2),
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    color: '#000000',
    textAlign: 'center',
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
    paddingVertical: hp(1.5),
    borderRadius: 30,
    alignItems: 'center',
    marginTop: hp(5),
  },
  registerButtonText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
  loginLink: {
    fontFamily: 'Roboto-Regular',
    color: '#27aae1',
  },
});

export default RegisterScreen;
