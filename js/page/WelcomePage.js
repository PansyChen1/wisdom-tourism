import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import LoginPage from "./LoginPage";

type Props = {};
export default class WelcomePage extends Component<Props> {
  //设置定时器，2秒之后从欢迎页跳转到首页
  // componentDidMount(){
  //   this.timer = setTimeout(() => {
  //     NavigationUtil.resetToHomePage({
  //       navigation: this.props.navigation
  //     })
  //   },10000);
  // }
  //
  // componentWillUnmount(){
  //   this.timer && clearTimeout(this.timer);
  // }

  render() {
    return (
      <View style={styles.container}>
        <LoginPage/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
