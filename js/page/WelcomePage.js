import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";

type Props = {};
const width = Dimensions.get('window').width;//得到屏幕宽度
const height = Dimensions.get('window').height;//得到屏幕长度
export default class WelcomePage extends Component<Props> {
  //设置定时器，2秒之后从欢迎页跳转到首页
  componentDidMount(){
    this.timer = setTimeout(() => {
      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation
      })
    },3000);
  }

  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../images/login.jpeg")}
          style={{width:width, height:height}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
