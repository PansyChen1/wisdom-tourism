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

type Props = {};
export default class HomePage extends Component<Props> {
  _tabNavigator(){
    return createBottomTabNavigator({
      PopularPage:{
        screen: PopularPage,
        navigationOptions:{
          tabBarLabel:"最热",
          tabBarIcon:({tintColor,focused}) => (
            <MaterialIcons
              name={"whatshot"}
              size={26}
              style={{color:tintColor}}
            />
          ),
        }
      },
      TrendingPage:{
        screen: TrendingPage,
        navigationOptions:{
          tabBarLabel:"趋势",
          tabBarIcon:({tintColor,focused}) => (
            <Feather
              name={"trending-up"}
              size={26}
              style={{color:tintColor}}
            />
          ),
        }
      },
      FavoritePage:{
        screen: FavoritePage,
        navigationOptions:{
          tabBarLabel:"收藏",
          tabBarIcon:({tintColor,focused}) => (
            <MaterialIcons
              name={"favorite"}
              size={26}
              style={{color:tintColor}}
            />
          ),
        }
      },
      MyPage:{
        screen: MyPage,
        navigationOptions:{
          tabBarLabel:"我的",
          tabBarIcon:({tintColor,focused}) => (
            <AntDesign
              name={"user"}
              size={26}
              style={{color:tintColor}}
            />
          ),
        }
      },
    })
  }
  render() {
    NavigationUtil.navigation = this.props.navigation;
    const Tab = createAppContainer(this._tabNavigator());
    return <Tab/>;
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
