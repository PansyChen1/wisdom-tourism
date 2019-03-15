import React, {Component} from 'react';
import {View, TextInput, Image, Text, TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationBar from "../common/NavigationBar";
import NavigationUtil from "../navigator/NavigationUtil";

var width = Dimensions.get('window').width;//得到屏幕宽度
const TITLE_COLOR = "#678";

export default class LoginPage extends Component{

  //点击登录函数
  onLoginButtonPress ()  {

    NavigationUtil.resetToFirstPage({
      navigation: this.props.navigation
    });

  };
  //点击注册函数
  onRegisterButtonPress() {
    NavigationUtil.resetToRegisterPage({
      navigation: this.props.navigation
    });
  }
  render() {
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: "light-content",
    };

    let navigationBar = <NavigationBar
      title={"济宁市智慧乡村旅游系统"}
      statusBar={statusBar}
      style={{backgroundColor: TITLE_COLOR}}
      // rightButton={this.renderRightButton()}
    />;

    return (
      <View style={LoginStyles.container}>
        {navigationBar}
        <Image source={require('../images/welcomePageLogin.jpeg')}//项目中的图片
               style={LoginStyles.logoImg}/>
        <View style={LoginStyles.row}>
          <AntDesign
            name={'user'}
            size={24}
            style={{paddingRight: 4}}
          />
          <TextInput
            placeholder="请输入用户名"
            underlineColorAndroid={'transparent'}//去掉下划线
            style={LoginStyles.username}
            //将文本写入state
            onChangeText={(username) => this.setState({username})}
          />
        </View>
        <View style={LoginStyles.row}>
          <AntDesign
            name={'lock'}
            size={24}
            style={{paddingRight: 4}}
          />
          <TextInput
            placeholder="请输入密码"
            ecureTextEntry={true}//隐藏输入内容
            underlineColorAndroid={'transparent'}
            style={LoginStyles.username}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.5}//点击时的透明度
          style={LoginStyles.login}
          //点击事件，要记得绑定
          onPress={this.onLoginButtonPress.bind(this)}>
          <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>
            登录
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}//点击时的透明度
          style={LoginStyles.login}
          //点击事件，要记得绑定
          onPress={this.onRegisterButtonPress.bind(this)}>
          <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>
            注册
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const LoginStyles = StyleSheet.create({
  container:{
    flex: 1,
  },
  row:{
    flexDirection: 'row',
    height:26,
    lineHeight:26,
    margin:25,
  },
  logoImg: {
    width:width,
    height:190,
    marginBottom:60
  },
  username: {
    fontSize:16,
    height:50,
    width:width-80,//居中，宽度为屏幕宽度-32，这样左右都有16的边距
    borderRadius: 6,//输入框边界圆角度数
    borderColor: "#678",//输入框边界颜色
    paddingLeft:10,//这里是为了在圆角之后输入
    padding:0,//去掉Android默认的padding
    borderWidth: 1,
    alignSelf:'center'//自身居中
  },
  login :{
    width:width-56,
    height:50,
    borderRadius: 6,//按钮圆角
    alignSelf:'center',
    backgroundColor:'#678',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'//显示Text组件居中
  },
});