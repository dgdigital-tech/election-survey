import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import colors from '../styles/colors';

const StatsCard = ({label, value, SvgComponent, onPress}) => {
  return (
    <View style={styles.card}>
      {/* Render the SVG Component directly */}
      <TouchableOpacity onPress={onPress}>
        {SvgComponent && <SvgComponent width={wp(10)} height={wp(10)} />}
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(32),
    gap: 2,
    paddingVertical: hp(2),
    // backgroundColor: colors.textSecondary,
    alignItems: 'center',
  },
  label: {
    fontSize: wp(3),
    fontFamily: 'Roboto-Regular',
    color: colors.textPrimary,
    marginTop: 2,
  },
  value: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: -5,
  },
});

export default StatsCard;
