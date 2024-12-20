import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SuperAdminDashboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Super Admin Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="user" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('SuperAdminScreen')}>
          <Text style={styles.buttonText}>Create Sub-Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('ReportsScreen')}>
          <Text style={styles.buttonText}>View Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('ManageAdminsScreen')}>
          <Text style={styles.buttonText}>Manage Admins</Text>
        </TouchableOpacity>
        {/* Add more buttons for other functionalities as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#944dff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuperAdminDashboard;
