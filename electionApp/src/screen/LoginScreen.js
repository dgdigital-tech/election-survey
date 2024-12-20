import React, {useState, useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet, Alert, View} from 'react-native';
import axios from 'axios';
import InputBox from '../components/InputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import {useFocusEffect} from '@react-navigation/native';
import Svg, {Image as SvgImage} from 'react-native-svg';

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
        await AsyncStorage.setItem('userRole', userdata.role);

        // Navigate to appropriate dashboard based on user role
        if (userdata.role === 'SuperAdmin') {
          navigation.navigate('SuperAdminDashboard');
        } else if (userdata.role === 'WardAdmin') {
          navigation.navigate('WardAdminDashboard');
        } else if (userdata.role === 'BoothAdmin') {
          navigation.navigate('BoothAdminDashboard');
        }
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
        if (token) {
          const role = await AsyncStorage.getItem('userRole');
          if (role === 'SuperAdmin') {
            navigation.replace('SuperAdminDashboard');
          } else if (role === 'WardAdmin') {
            navigation.replace('WardAdminDashboard');
          } else if (role === 'BoothAdmin') {
            navigation.replace('BoothAdminDashboard');
          } else {
            navigation.replace('Home');
          }
        }
      };

      checkToken();
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.svgBackground}>
        <SvgImage
          fill={'blue'}
          href={require('../assets/Icons/TextureBackground.svg')}
          width="100%"
          height="100%"
          // preserveAspectRatio="xMidYMid slice"
        />
      </Svg>
      <View style={styles.content}>
        <View style={styles.LogoWrapper}>
          {/* <Image style={styles.Logo} source={require('../../assets/jouls.png')} /> */}
        </View>
        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>WELCOME!</Text>
          <View style={styles.underline} />
        </View>
        <Text style={styles.title}>Login to your account</Text>
        <InputBox
          label="Email"
          placeholder="Enter your email"
          value={email}
          setValue={setEmail}
          iconname="email"
        />
        <InputBox
          label="Password"
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
          secureTextEntry
          iconname="lock"
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    justifyContent: 'center',
  },
  LogoWrapper: {
    borderRadius: 14,
    backgroundColor: '#223265',
    width: wp(65),
    height: hp(10),
    elevation: 3,
    alignSelf: 'center',
    marginTop: hp(2),
    marginBottom: hp(3),
  },
  title: {
    fontSize: wp(4.5),
    color: '#000',
    textAlign: 'center',
    marginBottom: -wp(5),
  },
  appNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp(5),
  },
  appName: {
    fontSize: wp(9.5),
    color: '#223265',
    fontFamily: 'Isidora Sans',
  },
  underline: {
    bottom: hp(0.5),
    width: wp(37),
    height: hp(0.3),
    backgroundColor: '#223265',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#04238E',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  loginButton: {
    backgroundColor: '#223265',
    width: wp(70),
    alignSelf: 'center',
    paddingVertical: hp(1.5),
    borderRadius: 30,
    alignItems: 'center',
    marginTop: hp(17),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: wp(5.5),
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: wp(3.5),
    color: '#777',
  },
  registerLink: {
    color: '#27aae1',
  },
});

export default LoginScreen;
