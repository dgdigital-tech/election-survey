import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import Asset9 from '../assets/Icons/Asset 9.svg';
import colors from '../styles/colors';

const WardInfo = ({wardNumber, wardName, onPress}) => {
  return (
    // style={{padding: 1}}
    <View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.BoothCardIcon} onPress={onPress}>
          <Asset9 width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.WardNumber}>WardNumber</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(20),
    height: wp(20),
    backgroundColor: colors.white,
    // padding: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BoothCardIcon: {
    width: wp(8),
    height: wp(8),
    backgroundColor: colors.white,
    borderRadius: wp(8) / 2,
    marginVertical: hp(1),
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  WardNumber: {
    fontSize: wp(2.5),
    marginTop: 4,
    fontFamily: 'Roboto-Regular',
    color: colors.primary,
    fontWeight: '600',
  },
});

export default WardInfo;
