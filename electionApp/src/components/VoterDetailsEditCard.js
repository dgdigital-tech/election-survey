import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import colors from '../styles/colors';

const VoterDetailsEditCard = ({
  epicId,
  name,
  contactNo,
  houseNo,
  caste,
  age,
  partyInclination,
  onEditPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <View style={styles.Itemsrow}>
          <View style={styles.row}>
            <Text style={styles.label}>Epic ID:</Text>
            <Text style={styles.value}>{epicId}</Text>
          </View>
        </View>
        <View style={styles.Itemsrow}>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>House No:</Text>
            <Text style={styles.value}>{houseNo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Caste:</Text>
            <Text style={styles.value}>{caste}</Text>
          </View>
        </View>
        <View style={styles.rowContact}>
          <Text style={styles.label}>Contact No:</Text>
          <Text style={styles.value}>{contactNo}</Text>
        </View>
        <View style={styles.Itemsrow}>
          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{age}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Party Inclination:</Text>
            <Text style={styles.value}>{partyInclination}</Text>
          </View>
          <TouchableOpacity onPress={onEditPress}>
            <View style={styles.editContainer}>
              <Text style={styles.editButtoText}>Edit Dtat</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(4),
    borderRadius: 10,
    marginVertical: hp(1),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
    overflow: 'hidden',
    flexWrap: 'wrap', // Ensures layout is responsive for smaller screens
  },
  detailsContainer: {
    flex: 1,
    marginRight: wp(2),
  },
  rowContact: {
    flexDirection: 'row',
    marginBottom: hp(0.2),
    gap: wp(2),
  },
  Itemsrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.2),
    gap: wp(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.2),
    gap: wp(2),
  },
  partitionBorder: {
    borderLeftWidth: 2,
    borderColor: '#f2f2f2',
    height: '80%',
    marginHorizontal: wp(4),
  },
  label: {
    fontSize: wp(2.5),
    color: '#000',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
  },
  value: {
    fontSize: wp(2.5),
    fontFamily: 'Roboto-Regular',
    color: '#7d7d7d',
  },
  editContainer: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#e5e5e5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtoText: {
    fontSize: wp(3),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: colors.primary,
  },
});

export default VoterDetailsEditCard;
