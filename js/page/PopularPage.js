import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil"
import DetailPage from "./DetailPage";

type Props = {};
export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabNames = ['景点', '美食', '特产', '民宿', '民俗'];
  }
  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        //初始化页面，传递参数
        screen: props => <PopularTab {...props} tabLabel={item}/>,
        navigationOptions: {
          title: item
        }
      }
    });
    return tabs;
  }
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          // scrollEnabled: true,//是否支持选项卡滚动
          style: {
            backgroundColor: '#678' //tabBar的背景色
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle
        }
      })
    );
    return <View style={{flex: 1}}>
        <TabNavigator/>
    </View>
  }
}

class PopularTab extends Component<Props> {
  render() {
    const {tabLabel} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLabel}</Text>
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "DetailPage")
        }}>跳转到详情页</Text>
        <Button
          title={"Fetch使用"}
          onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "FetchDemoPage")
        }}/>
        <Button
          title={"AsyncStorage使用"}
          onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, "AsyncStorageDemoPage")
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabStyle: {
    minWidth: 35
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    marginBottom: 6,
    marginTop: 6
  }
});
