// // App.
// import 'react-native-gesture-handler'; // Required at the top if you're using gesture-based navigation
// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';

// const App = () => {
//   return <AppNavigator />;
// };

// export default App;

import React from 'react';
import 'react-native-gesture-handler'; // Required at the top if you're using gesture-based navigation
import {NavigationContainer} from '@react-navigation/native';
import RegisterScreen from './src/screen/RegisterScreen';
import LoginScreen from './src/screen/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SuperAdminScreen from './src/screen/Admin/SuperAdminScreen';
import SuperAdminDashboard from './src/screen/Dashboard/SuperAdminDashboard';
import ProfileScreen from './src/screen/ProfileScreen';
import SplashScreen from './src/screen/SplashScreen';
import RedirectLogin from './src/screen/RedirectLogin';
import BoothAdminDashboard from './src/screen/Dashboard/BoothAdminDashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="BoothAdminDashboard"
          component={BoothAdminDashboard}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RedirectLogin" component={RedirectLogin} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="SuperAdminDashboard"
          component={SuperAdminDashboard}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        <Stack.Screen name="SuperAdminScreen" component={SuperAdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
