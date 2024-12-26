import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../styles/colors';

const ProfileScreen = () => {
  // Sample user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    profilePic:
      'https://i1.sndcdn.com/avatars-b3Op6VqenRjmQE7I-BySypQ-t500x500.jpg',
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: user.profilePic}} style={styles.profilePic} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.phone}>{user.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  phone: {
    fontSize: 18,
    color: colors.textSecondary,
  },
});

export default ProfileScreen;
