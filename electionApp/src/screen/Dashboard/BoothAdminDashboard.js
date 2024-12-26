import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import VoterDetailsCard from '../../components/VoterDetailsCard';
import VotingStatusCard from '../../components/VotingStatusCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import colors from '../../styles/colors';

const BoothAdminDashboard = () => {
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState(
    'https://example.com/default-profile-pic.png',
  );
  const [isBoothAdmin, setIsBoothAdmin] = useState(true);
  const [showVoterDetails, setShowVoterDetails] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedProfilePic = await AsyncStorage.getItem('profilePic');
        const userRole = await AsyncStorage.getItem('userRole');

        setUserName(storedUserName || 'User Name');
        setProfilePic(
          storedProfilePic || 'https://example.com/default-profile-pic.png',
        ); // Fallback if no profile pic
        setIsBoothAdmin(userRole === 'BoothAdmin');
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const toggleSection = () => setShowVoterDetails(!showVoterDetails);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        userName={userName}
        profilePic={profilePic}
        isBoothAdmin={isBoothAdmin}
      />
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            showVoterDetails ? styles.activeButton : null,
          ]}
          onPress={toggleSection}>
          <Text
            style={[
              styles.toggleButtonText,
              showVoterDetails ? styles.activeButtonText : null,
            ]}>
            Voter Details
          </Text>
        </TouchableOpacity>

        <View style={styles.partitionBorder}></View>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            !showVoterDetails ? styles.activeButton : null,
          ]}
          onPress={toggleSection}>
          <Text
            style={[
              styles.toggleButtonText,
              !showVoterDetails ? styles.activeButtonText : null,
            ]}>
            Voting Status
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
            voted={false}
          />
          {/* Dynamically add more VoterDetailsCard components as required */}
        </View>
      ) : (
        <View style={styles.statusContainer}>
          <Text style={styles.sectionTitle}>Voting Status</Text>
          <VotingStatusCard
            epicId="10897xxxxxxxx73485"
            name="Tinku ji"
            contactNo="+91 35xxxxxxxx8"
            houseNo="22"
            caste="Rajput"
            age={45}
            partyInclination="BJP"
            voted={true}
          />
          {/* Dynamically add more VotingStatusCard components as required */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
    borderBottomWidth: 2,
    borderBottomColor: '#e6e7e8',
    paddingBottom: 10,
  },
  partitionBorder: {
    borderLeftWidth: 2,
    borderColor: '#e6e7e9',
    height: '100%',
    marginHorizontal: wp(4),
  },
  toggleButton: {
    flex: 1,
    paddingVertical: hp(1),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: wp(1),
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#223265',
  },
  toggleButtonText: {
    fontSize: wp(4),
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
    color: colors.text,
  },
  activeButtonText: {
    color: '#fff',
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
    fontFamily: 'Roboto-Regular',
    color: colors.primary,
    marginBottom: hp(2),
  },
  placeholderText: {
    fontSize: wp(4),
    color: colors.grey,
    textAlign: 'center',
  },
});

export default BoothAdminDashboard;
