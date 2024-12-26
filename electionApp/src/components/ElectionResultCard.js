import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import colors from '../styles/colors';

const ElectionResultCard = ({partyLogo, partyName, votes}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>No. of votes</Text>
      <Text style={styles.votes}>{votes}</Text>
      <Image source={partyLogo} style={styles.logo} />
      <Text style={styles.partyName}>{partyName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(28),
    padding: wp(4),
    borderRadius: 10,
    backgroundColor: colors.background,
    elevation: 5,
    marginBottom: hp(2),
    alignItems: 'center',
  },
  label: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: colors.textPrimary,
  },
  logo: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10) / 2,
    marginBottom: hp(1),
  },
  partyName: {
    fontSize: wp(4),
    fontFamily: 'Roboto-Regular',
    color: colors.primary,
  },
  votes: {
    fontSize: wp(5),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: colors.primary,
  },
});

export default ElectionResultCard;
