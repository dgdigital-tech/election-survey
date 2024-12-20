import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
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
      <View style={styles.detailsContainer}>
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

      <View style={styles.votedContainer}>
        <Text style={styles.Votedlabel}>Voted</Text>
        <Text style={{fontSize: 12}}>Yes/No</Text>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="check"
            type="font-awesome"
            size={20}
            color={!voted ? 'green' : 'transparent'}
          />
          <Icon
            name="check"
            type="font-awesome"
            size={20}
            color={voted ? 'green' : 'transparent'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: wp(4),
    borderRadius: 10,
    marginVertical: hp(1),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.2),
    gap: 5,
  },
  partitionBorder: {
    borderLeftWidth: 1,
    borderColor: '#e0e0e0',
    height: '100%',
    alignSelf: 'center',
  },
  votedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: wp(2.8),
    color: '#000',
    fontWeight: 'bold',
    marginBottom: hp(0.2),
  },
  Votedlabel: {
    fontSize: wp(4),
    color: '#000',
    fontWeight: 'bold',
  },
  value: {
    fontSize: wp(2.8),
    color: '#7d7d7d',
  },
});

export default VoterDetailsCard;
