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
import {BackHandler} from "react-native";//处理物理返回键
import {NavigationActions} from "react-navigation";
import actions from "../action";
import {connect} from "react-redux";

type Props = {};
class HomePage extends Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  /**
   * 处理android中的物理返回键
   * **/
  onBackPress = () => {
    const {dispatch, nav} = this.props;
    if(nav.routes[1].index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }
  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator/>;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  theme: state.theme
});
export default connect(mapStateToProps)(HomePage);
