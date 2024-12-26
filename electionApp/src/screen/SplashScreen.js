import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('RedirectLogin');
    }, 3000); // You can adjust the time as per need

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/Assets/Asset35.png')}
      />
      <Text style={styles.text}>Voter Votes, VotD Verifies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223265',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(50),
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontSize: wp(4.5),
    marginTop: hp(2),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
