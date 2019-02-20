import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator,createAppContainer} from "react-navigation";
import PopularPage from "../page/PopularPage";
import TrendingPage from '../page/TrendingPage';
import FavoritePage from "../page/FavoritePage";
import MyPage from "../page/MyPage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";

type Props = {};
export default class HomePage extends Component<Props> {
  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
