import React, {Component} from 'react';
import {View, TextInput, Image, Text, TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

var width = Dimensions.get('window').width;//得到屏幕宽度

export default class LoginPage extends Component{

  //点击事件函数
  onButtonPress ()  {
    Alert.alert('用户输入信息','您输入的账号为：'+this.state.username+'，输入的密码为：'+this.state.password);
  };
  render() {
    return (
      <View style={LoginStyles.container}>
        <Image source={require('../images/welcomePageLogin.jpeg')}//项目中的图片
               style={LoginStyles.logoImg}/>
        <View style={LoginStyles.row}>
          <Text>
            <AntDesign
              name={'user'}
              size={24}
            />
          </Text>

          <TextInput
            placeholder="请输入用户名"
            underlineColorAndroid={'transparent'}//去掉下划线
            style={LoginStyles.username}
            //将文本写入state
            onChangeText={(username) => this.setState({username})}
          />
        </View>
        <View style={LoginStyles.row}>
          <Entypo
            name={'key'}
            size={24}
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
          onPress={this.onButtonPress.bind(this)}>
          <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>
            登录
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}//点击时的透明度
          style={LoginStyles.login}
          //点击事件，要记得绑定
          onPress={this.onButtonPress.bind(this)}>
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

  },
  row:{
    flexDirection: 'row',
    height:50,
    lineHeight:50,
    margin:15,
  },
  logoImg: {
    width:width,
    height:180,
    marginBottom:60
  },
  username: {
    fontSize:16,
    height:50,
    width:width-70,//居中，宽度为屏幕宽度-32，这样左右都有16的边距
    borderRadius: 6,//输入框边界圆角度数
    borderColor: "#678",//输入框边界颜色
    paddingLeft:10,//这里是为了在圆角之后输入
    padding:0,//去掉Android默认的padding
    borderWidth: 1,
    alignSelf:'center'//自身居中
  },
  login :{
    width:width-50,
    height:50,
    borderRadius: 6,//按钮圆角
    alignSelf:'center',
    backgroundColor:'#678',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'//显示Text组件居中
  },
});