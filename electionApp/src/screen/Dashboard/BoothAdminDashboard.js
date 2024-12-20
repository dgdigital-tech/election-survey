import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import VoterDetailsCard from '../../components/VoterDetailsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

const BoothAdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState(
    'https://example.com/default-profile-pic.png',
  ); // Default profile picture
  const [isBoothAdmin, setIsBoothAdmin] = useState(false);
  const [showVoterDetails, setShowVoterDetails] = useState(true); // State to toggle between sections

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedProfilePic = await AsyncStorage.getItem('profilePic'); // Assuming you store the profile pic URL
      const userRole = await AsyncStorage.getItem('userRole');
      setUserName(storedUserName || 'User Name');
      if (storedProfilePic) {
        setProfilePic(storedProfilePic);
      }
      setIsBoothAdmin(userRole === 'BoothAdmin');
    };

    fetchUserData();
  }, []);

  const toggleSection = () => {
    setShowVoterDetails(!showVoterDetails);
  };

  return (
    <View style={styles.container}>
      <Header
        userName={userName}
        profilePic={profilePic}
        isBoothAdmin={isBoothAdmin}
      />
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleSection}>
          <Text style={styles.toggleButtonText}>
            {showVoterDetails ? 'Voting Status' : 'Voter Details'}
          </Text>
        </TouchableOpacity>
      </View>
      {showVoterDetails ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Voter Details</Text>
          <VoterDetailsCard
            epicId="10897xxxxxxxx73485"
            name="Tinku ji"
            contactNo="+91 35xxxxxxxx8"
            houseNo="22"
            caste="Rajput"
            age={45}
            partyInclination="BJP"
            voted={true}
          />
          {/* Add more VoterDetailsCard components as needed */}
        </View>
      ) : (
        <View style={styles.statusContainer}>
          <Text style={styles.sectionTitle}>Voting Status</Text>
          {/* Add Voting Status content here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  toggleButton: {
    backgroundColor: '#223265',
    paddingVertical: hp(1),
    paddingHorizontal: wp(10),
    borderRadius: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  detailsContainer: {
    paddingHorizontal: wp(5),
  },
  statusContainer: {
    paddingHorizontal: wp(5),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#223265',
    marginBottom: hp(2),
  },
});

export default BoothAdminDashboard;
