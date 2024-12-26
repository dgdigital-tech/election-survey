import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import colors from '../styles/colors';
import BackButtonHeader from '../components/BackButtonHeader';

const WardAdminDetails = ({navigation}) => {
  const wardAdmins = [
    {id: '1', name: 'Admin 1', wardNumber: 'Ward 1'},
    {id: '2', name: 'Admin 2', wardNumber: 'Ward 2'},
    {id: '3', name: 'Admin 3', wardNumber: 'Ward 3'},
    // Add more ward admins as needed
  ];

  const renderWardAdmin = ({item}) => (
    <View style={styles.wardAdminCard}>
      <Text style={styles.wardAdminName}>{item.name}</Text>
      <Text style={styles.wardAdminWard}>{item.wardNumber}</Text>
      <TouchableOpacity style={styles.deleteIcon}>
        <Icon name="trash-2" size={wp(6)} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButtonHeader navigation={navigation} title="Ward Admins" />
      <FlatList
        data={wardAdmins}
        renderItem={renderWardAdmin}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(4),
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: colors.white,
  },
  headerSpacer: {
    width: wp(6),
  },
  listContainer: {
    padding: wp(4),
  },
  wardAdminCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    marginBottom: hp(2),
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 10,
  },
  wardAdminName: {
    fontSize: wp(4),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: colors.textPrimary,
  },
  wardAdminWard: {
    fontSize: wp(4),
    fontFamily: 'Roboto-Regular',
    color: colors.textSecondary,
  },
  deleteIcon: {
    padding: wp(2),
  },
});

export default WardAdminDetails;
