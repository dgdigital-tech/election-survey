import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Asset27 from '../assets/Icons/Asset27.svg';
import Logout from '../assets/Icons/Asset 4.svg';
import Homeicon from '../assets/Icons/Asset 19.svg';
import Notificatioicon from '../assets/Icons/Asset 2.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';

const Header = ({
  userName,
  profilePic,
  isBoothAdmin,
  wardName,
  isSuperAdmin,
}) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('Authtoken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userRole');
    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {/* Show profile pic and username if either Super Admin or Booth Admin */}
        {isSuperAdmin || isBoothAdmin ? (
          <>
            {!profilePic ? (
              <Asset27 style={styles.profilePicIcon} />
            ) : (
              <Image source={{uri: profilePic}} style={styles.profilePic} />
            )}
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontFamily: 'Roboto-Regular',
                }}>
                Welcome
              </Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </>
        ) : (
          // Show hamburger button when not Super Admin or Booth Admin
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.hamburgerButton}>
            <Icon name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View>
        <Text style={styles.wardName}>{wardName}</Text>
      </View>

      {/* Show logout button for Super Admin or Booth Admin */}
      {isSuperAdmin || isBoothAdmin ? (
        <>
          <TouchableOpacity>
            {isSuperAdmin && (
              <Notificatioicon
                width={24}
                height={24}
                style={styles.notificatioicon}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Logout width={24} height={24} />
          </TouchableOpacity>
        </>
      ) : (
        // Show the hamburger menu icon for non-Super Admin and non-Booth Admin

        <>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.hamburgerButton}>
            <Homeicon width={24} height={24} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(6.5),
    backgroundColor: colors.primary, // Keep the background color as #223265
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicIcon: {
    marginRight: wp(2),
    marginTop: 5,
    width: hp(5.5),
    height: hp(5.5),
  },
  profilePic: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    marginRight: wp(3),
  },
  userName: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: wp(3.5),
  },
  wardName: {
    fontSize: wp(5),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: colors.white,
  },
  notificatioicon: {
    marginLeft: wp(35),
  },
  logoutButton: {
    padding: wp(2),
  },
  hamburgerButton: {
    padding: wp(2),
  },
});

export default Header;
