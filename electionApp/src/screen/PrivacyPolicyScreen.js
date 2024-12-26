import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButtonHeader from '../components/BackButtonHeader';
import {responsiveWidth as wp} from 'react-native-responsive-dimensions';
import colors from '../styles/colors';

const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BackButtonHeader navigation={navigation} title="Privacy Policy" />
      <View style={styles.content}>
        <Text style={styles.text}>This is the Privacy Policy screen.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: wp(4),
  },
  text: {
    fontSize: wp(4),
    fontFamily: 'Roboto-Regular',
    color: colors.textPrimary,
  },
});

export default PrivacyPolicyScreen;
