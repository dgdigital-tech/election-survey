import 'react-native-gesture-handler'; // Required at the top if you're using gesture-based navigation
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// /**
//  * @format
//  */
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import 'react-native-gesture-handler';

// AppRegistry.registerComponent(appName, () => App);
