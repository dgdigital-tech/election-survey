import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AccessibilityInfo,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

const RedirectLogin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/Assets/Asset-1.png')}
        accessibilityLabel="App Logo"
      />
      <View style={styles.bottomCircle}>
        <Text style={styles.subText}>Join the Platform</Text>
        <Text style={styles.descriptionText}>
          Your Gateway to Voter Insights: Access {'\n'} Ward-Wise Voter Details
          at Your Fingertips!
        </Text>
      </View>

      <View style={styles.WardboothbuttonContainer}>
        <TouchableOpacity
          style={styles.Wardboothbutton}
          onPress={() => navigation.navigate('WardAdminDashboard')}
          accessibilityLabel="Go to Ward Admin Dashboard">
          <Text style={styles.buttonText}>Ward Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Wardboothbutton}
          onPress={() => navigation.navigate('BoothAdminDashboard')}
          accessibilityLabel="Go to Booth Admin Dashboard">
          <Text style={styles.buttonText}>Booth Admin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonLoginContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => navigation.navigate('LoginScreen')}
          accessibilityLabel="Login to the platform">
          <Text style={styles.buttonLoginText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223265',
    alignItems: 'center',
  },
  logo: {
    width: wp(100),
    height: hp(50),
    resizeMode: 'contain', // Ensures the logo doesn't stretch
  },
  bottomCircle: {
    backgroundColor: '#fff',
    marginTop: -hp(10),
    height: hp(35),
    width: wp(105),
    borderBottomLeftRadius: wp(105) / 2,
    borderBottomRightRadius: wp(105) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  subText: {
    color: '#223265',
    fontSize: wp(7),
    fontWeight: 'bold',
    marginTop: hp(6),
    textAlign: 'center',
  },
  descriptionText: {
    color: '#223265',
    fontSize: wp(4),
    textAlign: 'center',
    marginTop: hp(1),
    marginBottom: hp(8),
    paddingHorizontal: wp(5),
    lineHeight: 22,
  },
  WardboothbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(90),
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  Wardboothbutton: {
    backgroundColor: '#e5e5e5',
    width: wp(40),
    paddingVertical: hp(1.5),
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5, // Add shadow effect to buttons
  },
  buttonLoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp(5),
  },
  buttonLogin: {
    paddingVertical: hp(1.5),
    alignItems: 'center',
  },
  buttonText: {
    color: '#2e3192',
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  buttonLoginText: {
    color: '#fff',
    fontSize: wp(5),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RedirectLogin;
