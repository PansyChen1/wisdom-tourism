/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import WelcomePage from './js/page/WelcomePage';
import HomePage from './js/page/HomePage';


// 整个app的入口，链接到指定的js页面
AppRegistry.registerComponent(appName, () => WelcomePage);
