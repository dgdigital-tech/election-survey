import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet, View, Share} from 'react-native';
import SuperAdminDashboard from '../screen/Dashboard/SuperAdminDashboard';
import SettingsScreen from '../screen/SettingsScreen';
import ProfileScreen from '../screen/ProfileScreen';
import colors from '../styles/colors'; // Ensure you import the colors
import WardAdminDashboard from '../screen/Dashboard/WardAdminDashboard';

const Tab = createBottomTabNavigator();

const shareApp = async () => {
  try {
    const result = await Share.share({
      message: 'Check out this amazing app! Download it here: [Your App Link]',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type of result.activityType
      } else {
        // Shared
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Settings') {
          iconName = 'settings';
        } else if (route.name === 'MyProfile') {
          iconName = 'user';
        } else if (route.name === 'AppShare') {
          iconName = 'share-2';
        }

        return (
          <View style={styles.iconContainer}>
            <Icon name={iconName} size={size} color={color} />
          </View>
        );
      },
      tabBarActiveTintColor: colors.textSecondary,
      tabBarInactiveTintColor: colors.white,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarIconStyle: styles.tabBarIcon,
    })}>
    <Tab.Screen name="Home" component={SuperAdminDashboard} />
    <Tab.Screen name="MyProfile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
    <Tab.Screen
      name="WardAdminDashboard"
      component={WardAdminDashboard}
      options={{
        // tabBarButton: () => null, // Hide the tab bar button completely
        tabBarItemStyle: {display: 'none'}, // Hide the tab and its space
      }}
    />
    <Tab.Screen
      name="AppShare"
      component={SuperAdminDashboard}
      listeners={{
        tabPress: e => {
          e.preventDefault(); // Prevent the default action
          shareApp(); // Call the share function
        },
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    // marginHorizontal: 10,
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    height: 60,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    // borderRadius: 15,
    // padding: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabBarIcon: {
    marginTop: 4,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
