// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createStackNavigator} from '@react-navigation/stack';
// import RegisterScreen from '../screen/RegisterScreen';
// import LoginScreen from '../screen/LoginScreen';
// import HomeScreen from '../screen/HomeScreen';
// import ProfileScreen from '../screen/ProfileScreen';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{headerShown: false}}>
//     <Stack.Screen name="LoginScreen" component={LoginScreen} />
//     <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//   </Stack.Navigator>
// );

// const AppNavigator = () => (
//   <NavigationContainer>
//     <Drawer.Navigator>
//       <Drawer.Screen name="HomeScreen" component={HomeScreen} />
//       <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
//       <Drawer.Screen
//         name="AuthStack"
//         component={AuthStack}
//         options={{drawerLabel: 'Authentication'}}
//       />
//     </Drawer.Navigator>
//   </NavigationContainer>
// );

// export default AppNavigator;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../screen/RegisterScreen';
import LoginScreen from '../screen/LoginScreen';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import SuperAdminScreen from '../screen/Admin/SuperAdminScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen
        name="SuperAdminScreen"
        component={SuperAdminScreen}
        options={{drawerLabel: 'Super Admin'}}
      />
      <Drawer.Screen
        name="AuthStack"
        component={AuthStack}
        options={{drawerLabel: 'Authentication'}}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
