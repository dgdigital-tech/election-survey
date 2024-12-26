// HomeScreen.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../styles/colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 20,
    color: colors.primary,
  },
});

export default HomeScreen;
