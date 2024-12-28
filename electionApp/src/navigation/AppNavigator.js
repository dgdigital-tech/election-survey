import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

import RegisterScreen from '../screen/RegisterScreen';
import LoginScreen from '../screen/LoginScreen';
import SuperAdminScreen from '../screen/Admin/SuperAdminScreen';
import ProfileScreen from '../screen/ProfileScreen';
import SplashScreen from '../screen/SplashScreen';
import RedirectLogin from '../screen/RedirectLogin';
import BoothAdminDashboard from '../screen/Dashboard/BoothAdminDashboard';
import WardAdminDashboard from '../screen/Dashboard/WardAdminDashboard';
import BoothDetails from '../screen/BoothDetails';
import WardAdminDetails from '../screen/WardAdminDetails';
import SuperAdminDashboard from '../screen/Dashboard/SuperAdminDashboard';
import PrivacyPolicyScreen from '../screen/PrivacyPolicyScreen';
import UploadVoterdetails from '../components/UploadVoterdetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        <Stack.Screen
          name="UploadVoterdetails"
          component={UploadVoterdetails}
        />

        <Stack.Screen
          name="SuperAdminDashboard"
          component={SuperAdminDashboard}
        />
        <Stack.Screen
          name="BoothAdminDashboard"
          component={BoothAdminDashboard}
        />
        <Stack.Screen name="SuperAdminScreen" component={SuperAdminScreen} />
        <Stack.Screen
          name="WardAdminDashboard"
          component={WardAdminDashboard}
        />
        <Stack.Screen name="BoothDetails" component={BoothDetails} />

        <Stack.Screen name="RedirectLogin" component={RedirectLogin} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen name="WardAdminDetails" component={WardAdminDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
