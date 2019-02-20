import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomePage from "./page/HomePage";
import WelcomePage from "./page/WelcomePage";
import {Provider} from 'react-redux';
import AppNavigator from "./navigator/AppNavigators";
import store from './store';

type Props = {};
export default class App extends Component<Props> {
  render() {
    /**
     * 将store传递给app框架
     * **/
    return <Provider store={store}>
      <AppNavigator/>
    </Provider>;
  }
}

