import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Asset27 from '../assets/Icons/Asset27.svg';
import Asset4 from '../assets/Icons/Asset 4.svg';
import Asset19 from '../assets/Icons/Asset 19.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({userName, profilePic, isBoothAdmin}) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('Authtoken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userRole');
    navigation.replace('LoginScreen');
  };
  console.log(isBoothAdmin);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {isBoothAdmin ? (
          <>
            {!profilePic ? (
              <Asset27
                style={{
                  marginRight: wp(2),
                  marginTop: 5,
                  width: hp(5.5),
                  height: hp(5.5),
                }}
              />
            ) : (
              <Image source={{uri: profilePic}} style={styles.profilePic} />
            )}
            <Text style={styles.userName}>{userName}dfds</Text>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.hamburgerButton}>
            <Icon name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      {/* <View style={styles.leftContainer}>
        {!profilePic ? (
          <Asset27
            style={{
              marginRight: wp(2),
              marginTop: 5,
              width: hp(5.5),
              height: hp(5.5),
            }}
          />
        ) : (
          <Image source={{uri: profilePic}} style={styles.profilePic} />
        )}
        <Text style={styles.userName}>{userName}</Text>
      </View> */}
      {isBoothAdmin ? (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Asset4 width={24} height={24} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.hamburgerButton}>
          <Asset19 width={24} height={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(6.5),
    backgroundColor: '#223265',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    marginRight: wp(2),
  },
  userName: {
    color: '#fff',
    fontSize: wp(4.5),
  },
  logoutButton: {
    padding: wp(2),
  },
  hamburgerButton: {
    padding: wp(2),
  },
});

export default Header;

// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {
//   responsiveHeight as hp,
//   responsiveWidth as wp,
// } from 'react-native-responsive-dimensions';
// import Asset27 from '../assets/Icons/Asset27.svg';
// import Asset4 from '../assets/Icons/Asset4.svg';
// import Asset19 from '../assets/Icons/Asset19.svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Header = ({userName, profilePic, isBoothAdmin}) => {
//   const navigation = useNavigation();

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('Authtoken');
//     await AsyncStorage.removeItem('userId');
//     await AsyncStorage.removeItem('userRole');
//     navigation.replace('LoginScreen');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftContainer}>
//         {!profilePic ? (
//           <Asset27
//             style={{
//               marginRight: wp(2),
//               marginTop: 5,
//               width: hp(5.5),
//               height: hp(5.5),
//             }}
//           />
//         ) : (
//           <Image source={{uri: profilePic}} style={styles.profilePic} />
//         )}

//         <Text style={styles.userName}>{userName}</Text>
//       </View>
//       {isBoothAdmin ? (
//         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//           <Asset4 width={24} height={24} />
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity
//           onPress={() => navigation.openDrawer()}
//           style={styles.hamburgerButton}>
//           <Asset19 width={24} height={24} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: hp(6.5),
//     backgroundColor: '#223265',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(5),
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profilePic: {
//     width: hp(5),
//     height: hp(5),
//     borderRadius: hp(2.5),
//     marginRight: wp(2),
//     // backgroundColor: 'red',
//   },
//   userName: {
//     color: '#fff',
//     fontSize: wp(4.5),
//   },
//   logoutButton: {
//     padding: wp(2),
//   },
//   hamburgerButton: {
//     padding: wp(2),
//   },
// });

// export default Header;
