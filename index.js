/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import AppNavigator from './js/navigator/AppNavigators';
import {name as appName} from './app.json';

// 整个app的入口，链接到指定的js页面
AppRegistry.registerComponent(appName, () => AppNavigator);
