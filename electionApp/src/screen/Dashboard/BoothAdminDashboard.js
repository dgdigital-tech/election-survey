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
  const [isBoothAdmin, setIsBoothAdmin] = useState(false);
  const [showVoterDetails, setShowVoterDetails] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedProfilePic = await AsyncStorage.getItem('profilePic');
        const userRole = await AsyncStorage.getItem('userRole');
        setUserName(storedUserName || 'User Name');
        if (storedProfilePic) setProfilePic(storedProfilePic);
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
          {/* Add more VoterDetailsCard components as needed */}
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
          {/* Add more VotingStatusCard components as needed */}
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
  },
  toggleButton: {
    flex: 1,
    paddingVertical: hp(1),
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    marginHorizontal: wp(1),
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  toggleButtonText: {
    fontSize: wp(4),
    fontWeight: 'bold',
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

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import Header from '../../components/Header';
// import VoterDetailsCard from '../../components/VoterDetailsCard';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   responsiveHeight as hp,
//   responsiveWidth as wp,
// } from 'react-native-responsive-dimensions';
// import colors from '../../styles/colors';

// const BoothAdminDashboard = () => {
//   const [userName, setUserName] = useState('');
//   const [profilePic, setProfilePic] = useState(
//     'https://example.com/default-profile-pic.png',
//   ); // Default profile picture
//   const [isBoothAdmin, setIsBoothAdmin] = useState(false);
//   const [showVoterDetails, setShowVoterDetails] = useState(true); // Toggle state
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const storedUserName = await AsyncStorage.getItem('userName');
//         const storedProfilePic = await AsyncStorage.getItem('profilePic'); // Profile picture
//         const userRole = await AsyncStorage.getItem('userRole');
//         setUserName(storedUserName || 'User Name');
//         if (storedProfilePic) setProfilePic(storedProfilePic);
//         setIsBoothAdmin(userRole === 'BoothAdmin');
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchUserData();
//   }, []);

//   const toggleSection = () => setShowVoterDetails(!showVoterDetails);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Header
//         userName={userName}
//         profilePic={profilePic}
//         isBoothAdmin={isBoothAdmin}
//       />
//       <View style={styles.toggleContainer}>
//         <TouchableOpacity
//           style={[
//             styles.toggleButton,
//             showVoterDetails ? styles.activeButton : null,
//           ]}
//           onPress={toggleSection}>
//           <Text
//             style={[
//               styles.toggleButtonText,
//               showVoterDetails ? styles.activeButtonText : null,
//             ]}>
//             Voter Details
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.toggleButton,
//             !showVoterDetails ? styles.activeButton : null,
//           ]}
//           onPress={toggleSection}>
//           <Text
//             style={[
//               styles.toggleButtonText,
//               !showVoterDetails ? styles.activeButtonText : null,
//             ]}>
//             Voting Status
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {showVoterDetails ? (
//         <View style={styles.detailsContainer}>
//           <Text style={styles.sectionTitle}>Voter Details</Text>
//           <VoterDetailsCard
//             epicId="10897xxxxxxxx73485"
//             name="Tinku ji"
//             contactNo="+91 35xxxxxxxx8"
//             houseNo="22"
//             caste="Rajput"
//             age={45}
//             partyInclination="BJP"
//             initialVoted={false}
//           />
//           {/* Add more VoterDetailsCard components as needed */}
//         </View>
//       ) : (
//         <View style={styles.statusContainer}>
//           <Text style={styles.sectionTitle}>Voting Status</Text>
//           <Text style={styles.placeholderText}>No status available yet.</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.background,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: hp(2),
//   },
//   toggleButton: {
//     flex: 1,
//     paddingVertical: hp(1),
//     borderRadius: 20,
//     backgroundColor: colors.lightGrey,
//     marginHorizontal: wp(1),
//     alignItems: 'center',
//   },
//   activeButton: {
//     backgroundColor: colors.primary,
//   },
//   toggleButtonText: {
//     fontSize: wp(4),
//     fontWeight: 'bold',
//     color: colors.text,
//   },
//   activeButtonText: {
//     color: '#fff',
//   },
//   detailsContainer: {
//     paddingHorizontal: wp(5),
//   },
//   statusContainer: {
//     paddingHorizontal: wp(5),
//   },
//   sectionTitle: {
//     fontSize: wp(5),
//     fontWeight: 'bold',
//     color: colors.primary,
//     marginBottom: hp(2),
//   },
//   placeholderText: {
//     fontSize: wp(4),
//     color: colors.grey,
//     textAlign: 'center',
//   },
// });

// export default BoothAdminDashboard;
