import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator,createAppContainer, } from "react-navigation";
import PopularPage from "../page/PopularPage";
import TrendingPage from '../page/TrendingPage';
import FavoritePage from "../page/FavoritePage";
import MyPage from "../page/MyPage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationUtil from "../navigator/NavigationUtil";
import {BottomTabBar} from 'react-navigation-tabs';
import {connect} from "react-redux";

const TABS = {//配置跳转的路由
  PopularPage:{
    screen: PopularPage,
    navigationOptions:{
      tabBarLabel:"旅游信息",
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
      tabBarLabel:"个性化",
      tabBarIcon:({tintColor,focused}) => (
        <AntDesign
          name={"customerservice"}
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
}
type Props = {};
class DynamicTabNavigator extends Component<Props> {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavigator(){
    if(this.Tabs) {
      return this.Tabs;
    }
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};//根据需要定制显示的tab
    // PopularPage.navigationOptions.tabBarLabel="最新";//动态修改tab的名称
    return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: props => {
        return <TabBarComponent theme={this.props.theme} {...props}/>
      }
    }));
  }
  render() {
    const Tab = createAppContainer(this._tabNavigator());
    return <Tab/>;
  }
}

class TabBarComponent extends React.Component{
  constructor(props){
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    }
  }
  render() {
    return <BottomTabBar
      {...this.props}
      activeTintColor={this.props.theme}
    />
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(DynamicTabNavigator);
