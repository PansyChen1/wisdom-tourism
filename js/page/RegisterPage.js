import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationUtil from "../navigator/NavigationUtil";
import ViewUtil from "../util/ViewUtil";

const THEME_COLOR = "#678";
export default class RegisterPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      canGoBack: false
    }
  }
  onBack() {
    if(this.state.canGoBack) {
      this.webView.goBack();
    }else {
      NavigationUtil.goBack(this.props.navigation);
    }
  }
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
      title={"注册"}
      statusBar={statusBar}
      style={{backgroundColor: THEME_COLOR}}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
    />;
    return(
      <View>
        {navigationBar}
        <Text>Register</Text>
      </View>
    )
  }
}