import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationUtil from "../navigator/NavigationUtil";
import ViewUtil from "../util/ViewUtil";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BackPressComponent from "../common/BackPressComponent";

const THEME_COLOR = "#678";
type Props = {};
var width = Dimensions.get('window').width;//得到屏幕宽度
export default class RegisterPage extends Component<Props>{
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
    };
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
  }
  /**
   * 处理android中的物理返回键
   **/
  componentDidMount() {
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    this.onBack();
    return true;
  }
  onBack() {
    if(this.state.canGoBack) {
      this.webView.goBack();
    }else {
      NavigationUtil.goBack(this.props.navigation);
    }
  }

  onRegisterButtonPress() {

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

        <View style={LoginStyles.container}>
          <View style={LoginStyles.row}>
            <AntDesign
              name={'user'}
              size={24}
              style={{paddingRight: 4}}
            />
            <TextInput
              placeholder="手机号"
              underlineColorAndroid={'transparent'}//去掉下划线
              style={LoginStyles.username}
              //将文本写入state
              onChangeText={(telephone) => this.setState({telephone})}
            />
          </View>
          <View style={LoginStyles.row}>
            <MaterialCommunityIcons
              name={'email-outline'}
              size={24}
              style={{paddingRight: 4}}
            />
            <TextInput
              placeholder="邮箱"
              ecureTextEntry={true}//隐藏输入内容
              underlineColorAndroid={'transparent'}
              style={LoginStyles.username}
              onChangeText={(email) => this.setState({email})}
            />
          </View>
          <View style={LoginStyles.row}>
            <AntDesign
              name={'lock'}
              size={24}
              style={{paddingRight: 4}}
            />
            <TextInput
              placeholder="密码"
              ecureTextEntry={true}//隐藏输入内容
              underlineColorAndroid={'transparent'}
              style={LoginStyles.username}
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <View style={LoginStyles.row}>
            <AntDesign
              name={'Safety'}
              size={24}
              style={{paddingRight: 4}}
            />
            <TextInput
              placeholder="验证码"
              ecureTextEntry={true}//隐藏输入内容
              underlineColorAndroid={'transparent'}
              style={{
                fontSize:16,
                height:50,
                width:220,//居中，宽度为屏幕宽度-32，这样左右都有16的边距
                borderRadius: 6,//输入框边界圆角度数
                borderColor: "#678",//输入框边界颜色
                paddingLeft:10,//这里是为了在圆角之后输入
                padding:0,//去掉Android默认的padding
                borderWidth: 1,
                alignSelf:'center'
              }}
              onChangeText={(password) => this.setState({password})}
            />
            <TouchableOpacity
              activeOpacity={0.5}//点击时的透明度
              style={{
                width:100,
                height:50,
                borderRadius: 6,//按钮圆角
                alignSelf:'center',
                backgroundColor:'#678',
                justifyContent:'center',
                alignItems:'center',
                marginLeft:10
              }}
              //点击事件，要记得绑定
              onPress={this.onRegisterButtonPress.bind(this)}>
              <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>
                获取验证码
              </Text>
            </TouchableOpacity>
          </View>
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
      </View>
    )
  }
}
const LoginStyles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop:40
  },
  row:{
    flexDirection: 'row',
    height:26,
    lineHeight:26,
    margin:25,
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