import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const WardAdminDashboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ward Admin Dashboard</Text>
      <Button
        title="Update Voter List"
        onPress={() => navigation.navigate('UpdateVoterListScreen')}
      />
      <Button
        title="Polling Day Updates"
        onPress={() => navigation.navigate('PollingDayUpdatesScreen')}
      />
      {/* Additional functionalities */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default WardAdminDashboard;
