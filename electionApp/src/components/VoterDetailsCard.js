import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

const VoterDetailsCard = ({
  epicId,
  name,
  contactNo,
  houseNo,
  caste,
  age,
  partyInclination,
  voted,
}) => {
  return (
    <View style={styles.card}>
      <View>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.label}>Epic ID:</Text>
            <Text style={styles.value}>{epicId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Caste:</Text>
            <Text style={styles.value}>{caste}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{age}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.label}>Contact No:</Text>
            <Text style={styles.value}>{contactNo}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.label}>House No:</Text>
            <Text style={styles.value}>{houseNo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Party Inclination:</Text>
            <Text style={styles.value}>{partyInclination}</Text>
          </View>
        </View>
      </View>
      <View style={styles.partitionBorder}></View>
      <View style={styles.column}>
        <Text style={styles.label}>Voted:</Text>
        <Text style={styles.value}>{voted ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: wp(5),
    borderRadius: 10,
    marginVertical: hp(1),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.2),
    gap: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.2),
    gap: 5,
  },
  column: {
    flex: 1,
  },
  partitionBorder: {
    borderLeftWidth: 2,
    borderColor: '#f2f2f2',
    height: '75%',
    paddingRight: '2%',
  },
  label: {
    fontSize: wp(3),
    color: '#000000',
    fontWeight: 'bold',
  },
  value: {
    fontSize: wp(3),
    color: '#7d7d7d',
  },
});

export default VoterDetailsCard;
