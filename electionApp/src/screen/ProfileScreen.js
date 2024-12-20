import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('Authtoken');
        if (userId && token) {
          const response = await fetch(
            `http://192.168.218.108:5000/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();
          setUserDetails(data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Profile Screen</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{userDetails.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{userDetails.email}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{userDetails.phone}</Text>
      <Text style={styles.label}>Role:</Text>
      <Text style={styles.value}>{userDetails.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#777',
  },
});

export default ProfileScreen;
