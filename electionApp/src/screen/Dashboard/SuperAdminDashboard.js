import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import colors from '../../styles/colors';
import StatsCard from '../../components/StatsCard';
import Asset5 from '../../assets/Icons/Asset 5.svg';
import Asset6 from '../../assets/Icons/Asset 7.svg';
import Asset7 from '../../assets/Icons/Asset 9.svg';
import Asset8 from '../../assets/Icons/Asset 8.svg';
import BJP from '../../assets/Icons/Bjp.png';
import AAP from '../../assets/Icons/aap.png';
import CNG from '../../assets/Icons/cng.png';
import JDU from '../../assets/Icons/jdu.png';
import RJD from '../../assets/Icons/rjd.png';
import LJP from '../../assets/Icons/ljp.png';
import WardInfo from '../../components/WardInfo';
import ElectionResultCard from '../../components/ElectionResultCard';
import CarouselPage from '../../components/CarouselPage';

const SuperAdminDashboard = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState(
    'https://i1.sndcdn.com/avatars-b3Op6VqenRjmQE7I-BySypQ-t500x500.jpg',
  );

  const electionResults = [
    {partyName: 'BJP', votes: 1254, partyLogo: BJP},
    {partyName: 'LJP', votes: 97, partyLogo: LJP},
    {partyName: 'Congress', votes: 551, partyLogo: CNG},
    {partyName: 'AAP', votes: 324, partyLogo: AAP},
    {partyName: 'JDU', votes: 163, partyLogo: JDU},
    {partyName: 'RJD', votes: 254, partyLogo: RJD},
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedProfilePic = await AsyncStorage.getItem('profilePic');
        setUserName(storedUserName || 'User Name');
        if (storedProfilePic) setProfilePic(storedProfilePic);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16} // Enables smooth scrolling
    >
      <Header userName={userName} profilePic={profilePic} isSuperAdmin={true} />

      <View style={styles.adminCreateContainer}>
        <TouchableOpacity
          style={styles.adminCreateButton}
          onPress={() => navigation.navigate('BoothAdminDashboard')}>
          <Text style={styles.adminCreateButtonText}>Booth Admins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminCreateButton}>
          <Text style={styles.adminCreateButtonText}>Ward Admins</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <StatsCard label="No. of Wards" value="57" SvgComponent={Asset5} />
          <View style={styles.verticalPartitionBorder}></View>
          <StatsCard label="No. of Booths" value="542" SvgComponent={Asset6} />
          <View style={styles.verticalPartitionBorder}></View>
          <StatsCard
            label="No. of Voters"
            value="835,546"
            SvgComponent={Asset7}
          />
        </View>
        <View style={styles.horizontalPartitionBorder}></View>
        <View style={styles.statsGrid}>
          <StatsCard
            label="No. of Ward Admin"
            value="57"
            SvgComponent={Asset8}
            onPress={() => navigation.navigate('WardAdminDetails')}
          />
          <View style={styles.verticalPartitionBorder}></View>
          <StatsCard
            label="No. of Booth Admin"
            value="542"
            SvgComponent={Asset8}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Ward Info</Text>
        </View>
        <View style={styles.wardContainer}>
          <ScrollView
            contentContainerStyle={styles.wardContentContainer}
            showsVerticalScrollIndicator={true}>
            {Array.from({length: 57}).map((_, index) => (
              <WardInfo
                key={index}
                wardNumber={index + 1}
                onPress={() =>
                  navigation.navigate('WardAdminDashboard', {
                    wardNumber: index + 1,
                  })
                }
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* CarouselPage */}

      <View style={styles.CarouselContainer}>
        <CarouselPage />
      </View>

      <View style={styles.electionSection}>
        <Text style={styles.electionSectionLabel}>Ongoing Election</Text>
        <Text style={styles.electionSectionTitle}>Assembly Constituency</Text>
        <View style={styles.underline} />
        <View style={styles.grid}>
          {electionResults.map((result, index) => (
            <ElectionResultCard
              key={index}
              partyName={result.partyName}
              votes={result.votes}
              partyLogo={result.partyLogo}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  adminCreateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    backgroundColor: colors.primary,
    borderBottomColor: '#e6e7e8',
    padding: 15,
  },
  horizontalPartitionBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.textSecondary,
    width: '100%',
    marginVertical: wp(2),
  },
  verticalPartitionBorder: {
    borderLeftWidth: 1,
    borderColor: colors.textSecondary,
    height: '100%',
  },
  adminCreateButton: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: hp(1),
    borderRadius: 20,
    fontFamily: 'Roboto-Regular',
    marginHorizontal: wp(1),
    alignItems: 'center',
  },
  adminCreateButtonText: {
    fontSize: wp(4),
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
    color: colors.primarytext,
  },
  statsContainer: {
    paddingBottom: wp(4),
    elevation: 20,
    backgroundColor: colors.white,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  section: {
    marginTop: hp(2),
    paddingHorizontal: wp(4),
  },
  wardContainer: {
    backgroundColor: colors.white,
    elevation: 10,
    borderRadius: 20,
    paddingVertical: 10,
    height: hp(35),
    overflow: 'hidden',
  },
  wardContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 2,
  },
  CarouselContainer: {
    marginVertical: hp(4),
  },
  electionSection: {
    // marginTop: hp(2),
    paddingHorizontal: wp(4),
  },
  electionSectionLabel: {
    fontSize: wp(6),
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: colors.textPrimary,
  },
  electionSectionTitle: {
    fontSize: wp(4),
    alignSelf: 'center',
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    color: colors.primary,
    marginBottom: 10,
  },
  underline: {
    borderBottomWidth: 2,
    borderColor: '#223265',
    width: wp(35),
    marginTop: -8,
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    marginTop: 30,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 2,
  },
  sectionTitleContainer: {
    backgroundColor: colors.primary,
    width: wp(30),
    padding: 5,
    borderRadius: 10,
    paddingBottom: 10,
    marginBottom: -18,
  },
  sectionTitle: {
    fontSize: wp(4),
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    marginBottom: hp(2),
    color: colors.white,
  },
});

export default SuperAdminDashboard;
