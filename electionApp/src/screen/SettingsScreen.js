import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BackButtonHeader from '../components/BackButtonHeader';
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
} from 'react-native-responsive-dimensions';
import colors from '../styles/colors';

const SettingsScreen = ({navigation}) => {
  const sections = [
    {title: 'Privacy Policy', screen: 'PrivacyPolicyScreen'},
    // {title: 'Terms of Service', screen: 'TermsOfService'},
    // {title: 'Account Settings', screen: 'AccountSettings'},
    // {title: 'Notification Settings', screen: 'NotificationSettings'},
    // Add more sections as needed
  ];

  return (
    <View style={styles.container}>
      <BackButtonHeader navigation={navigation} title="Settings" />
      <ScrollView contentContainerStyle={styles.listContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.section}
            onPress={() => navigation.navigate(section.screen)}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: wp(4),
  },
  section: {
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: wp(5),
    fontFamily: 'Roboto-Regular',
    color: colors.textPrimary,
  },
});

export default SettingsScreen;
