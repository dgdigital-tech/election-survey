import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

import colors from '../../styles/colors';
import BoothCard from '../../components/BoothCard';
import {panHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

const WardAdminDashboard = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [wardName, setWardName] = useState('Ward Name');
  const [boothCards, setBoothCards] = useState([]);

  const handlebooth = () => {
    // console.log();

    navigation.navigate('BoothDetails');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedProfilePic = await AsyncStorage.getItem('profilePic');
        const storedWardName = await AsyncStorage.getItem('wardName'); // Assuming you store the ward name
        setUserName(storedUserName || 'User Name');
        setProfilePic(storedProfilePic || null); // Set null if no profile pic is available
        setWardName(storedWardName || 'Default Ward');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    // Create an array of objects with boothNumber prop
    const boothData = [
      {boothNumber: 1},
      {boothNumber: 2},
      {boothNumber: 3},
      {boothNumber: 4},
      {boothNumber: 5},
      {boothNumber: 6},
      {boothNumber: 7},
      {boothNumber: 8},
      {boothNumber: 9},
    ];

    setBoothCards(boothData);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        userName={userName}
        wardName={wardName}
        profilePic={profilePic}
        isBoothAdmin={false}
      />
      <ScrollView>
        <View style={styles.wardContainer}>
          {boothCards.map((booth, index) => (
            <BoothCard
              key={index}
              boothNumber={booth.boothNumber}
              onPress={handlebooth}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  wardName: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default WardAdminDashboard;
