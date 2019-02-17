/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// 整个app的入口，链接到App.js
AppRegistry.registerComponent(appName, () => App);
