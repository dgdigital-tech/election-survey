import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import colors from '../styles/colors';

const VoterDetailsCard = ({
  epicId,
  name,
  contactNo,
  houseNo,
  caste,
  age,
  partyInclination,
  voted,
  onVoteStatusChange,
}) => {
  const [hasVoted, setHasVoted] = useState(voted);

  console.log(voted);

  const handleEditVotingStatus = () => {
    const newVotedStatus = !hasVoted;
    setHasVoted(newVotedStatus);
    onVoteStatusChange(epicId, newVotedStatus); // Update the parent component
  };

  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <View style={styles.Itemsrow}>
          <View style={styles.row}>
            <Text style={styles.label}>Epic ID:</Text>
            <Text style={styles.value}>{epicId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Caste:</Text>
            <Text style={styles.value}>{caste}</Text>
          </View>
        </View>
        <View style={styles.Itemsrow}>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{age}</Text>
          </View>
        </View>
        <View style={styles.rowContact}>
          <Text style={styles.label}>Contact No:</Text>
          <Text style={styles.value}>{contactNo}</Text>
        </View>
        <View style={styles.Itemsrow}>
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
      <View style={styles.voteContainer}>
        <Text style={styles.voteLabel}>Voted</Text>
        <Text style={styles.voteStatus}>{!hasVoted ? 'Yes' : 'No'}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleEditVotingStatus}>
            <Icon
              name="check"
              size={20}
              color={!hasVoted ? 'green' : '#414042'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditVotingStatus}>
            <Icon name="cross" size={20} color={hasVoted ? 'red' : '#414042'} />
          </TouchableOpacity>
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
    height: '90%',
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
  voteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  voteLabel: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
  },
  voteStatus: {
    fontSize: wp(3),
    color: '#7d7d7d',
    fontFamily: 'Roboto-Regular',
    marginBottom: hp(0.5),
  },
});

export default VoterDetailsCard;
