import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import {MORE_MENU} from "../common/MORE_MENU";
import ViewUtil from "../util/ViewUtil";
import BackPressComponent from "../common/BackPressComponent";
import AntDesign from "react-native-vector-icons/AntDesign";

const THEME_COLOR = "#E96";
const width = Dimensions.get('window').width;
type Props = {};
export default class MerchantPage extends Component<Props> {
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

  onClick(menu) {
    let RouteName, params = {};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName: 'WebViewPage';
        params.title = "教程";
        params.url = "https://coding.m.imooc.com/classindex.html?cid=89";
        break;
    }
    if(RouteName) {
      NavigationUtil.goPage(params, RouteName);
    }
  }

  getItem(menu) {
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
  }
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
      title={"申请成为商家"}
      statusBar={statusBar}
      style={{backgroundColor: THEME_COLOR}}
      // rightButton={this.getRightButton()}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
    />;
    const {theme} = this.props;

    return (
      <View style={styles.container}>
        {navigationBar}

        <ScrollView>
            <View style={styles.row}>
              <AntDesign
                name={'user'}
                size={24}
                style={{paddingRight: 4}}
              />
              <TextInput
                placeholder="请输入用户名"
                underlineColorAndroid={'transparent'}//去掉下划线
                style={styles.username}
                //将文本写入state
                onChangeText={(username) => this.setState({username})}
              />
            </View>
            <View style={styles.row}>
              <AntDesign
                name={'lock'}
                size={24}
                style={{paddingRight: 4}}
              />
              <TextInput
                placeholder="请输入密码"
                ecureTextEntry={true}//隐藏输入内容
                underlineColorAndroid={'transparent'}
                style={styles.username}
                onChangeText={(password) => this.setState({password})}
              />
            </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30
  },
  row:{
    flexDirection: 'row',
    height:26,
    lineHeight:26,
    margin:25,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  mp10: {
    marginTop: 10,
    fontSize:18,
    marginLeft:180
  },
  btn: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E96',
    padding: 5,
  },
  btn_text: {
    lineHeight: 30,
    textAlign: 'center',
    color: '#fff',
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
    alignSelf:'center',//自身居中
    marginTop:10
  },
  login :{
    width:width-56,
    height:50,
    borderRadius: 6,//按钮圆角
    alignSelf:'center',
    backgroundColor:THEME_COLOR,
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'//显示Text组件居中
  },
});
