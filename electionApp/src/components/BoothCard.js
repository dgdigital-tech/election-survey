import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import Asset9 from '../assets/Icons/Asset 9.svg';
import colors from '../styles/colors'; // Import your color variables

const BoothCard = ({boothNumber, onPress}) => {
  return (
    <View style={{padding: 1}}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.BoothCardIcon} onPress={onPress}>
          <Asset9 width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.boothName}>boothName {boothNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(32),
    height: wp(32),
    backgroundColor: colors.white,
    padding: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BoothCardIcon: {
    width: wp(12),
    height: wp(12),
    backgroundColor: colors.white,
    borderRadius: wp(12) / 2,
    marginVertical: hp(1),
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boothName: {
    fontSize: wp(3.2),
    marginTop: 10,
    color: '#223265',
    fontFamily: 'Roboto-Regular',
    fontWeight: '600',
  },
});

export default BoothCard;
