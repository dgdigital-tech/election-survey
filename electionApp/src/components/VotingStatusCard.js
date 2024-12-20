import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import colors from '../styles/colors'; // Import the colors

const VotingStatusCard = ({
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
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.label}>Epic ID:</Text>
            <Text style={styles.value}>{epicId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Contact No:</Text>
          <Text style={styles.value}>{contactNo}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.label}>House No:</Text>
            <Text style={styles.value}>{houseNo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Caste:</Text>
            <Text style={styles.value}>{caste}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{age}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Party Inclination:</Text>
            <Text style={styles.value}>{partyInclination}</Text>
          </View>
        </View>
      </View>
      <View style={styles.partitionBorder}></View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.label}>Voted</Text>
        <CheckBox
          checked={voted}
          disabled
          checkedColor={colors.voted}
          containerStyle={styles.checkboxContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: wp(4),
    borderRadius: 10,
    marginVertical: hp(1),
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.2),
    overflow: 'hidden',
    gap: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.2),
    gap: 10,
  },
  partitionBorder: {
    borderLeftWidth: 2,
    borderColor: '#f2f2f2',
    height: '100%',
  },
  label: {
    fontSize: wp(2.8),
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  value: {
    fontSize: wp(2.8),
    color: colors.textSecondary,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
});

export default VotingStatusCard;
