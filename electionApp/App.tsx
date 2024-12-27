import 'react-native-gesture-handler'; // Required at the top if you're using gesture-based navigation
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#223265" />
      <AppNavigator />
    </>
  );
};

export default App;
