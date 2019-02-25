import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationBar from "../common/NavigationBar";
import {MORE_MENU} from "../common/MORE_MENU";
import GlobalStyles from "../res/styles/GlobalStyles";
import ViewUtil from "../util/ViewUtil";

const THEME_COLOR = "#678"
type Props = {};
export default class MyPage extends Component<Props> {

  getRightButton() {
    return <View style={{flexDirection: "row"}}>
      <TouchableOpacity
        onPress={() => {

        }}
      >
        <View style={{padding: 5, marginRight: 8}}>
          <Feather
            name={'search'}
            size={24}
            style={{color: "white"}}
          />
        </View>
        <Ionicons
          name={'ios-arrow-forward'}
          size={16}
          style={{
            marginRight: 10,
            alignSelf: 'center',
            color: THEME_COLOR,
          }}/>
      </TouchableOpacity>
    </View>
  }

  getLeftButton(callback) {
    return <TouchableOpacity
      style={{padding: 8, paddingLeft: 12}}
      onPress={callback}
    >
      <Ionicons
        name={'ios-arrow-back'}
        size={26}
        style={{color: "white"}}
      />
    </TouchableOpacity>
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
      title={"我的"}
      statusBar={statusBar}
      style={{backgroundColor: THEME_COLOR}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;

    return (
      <View style={GlobalStyles.root_container}>
        {navigationBar}

        <ScrollView>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.onClick(MORE_MENU.About)}
          >
            <View style={styles.about_left}>
              <Ionicons
                name={MORE_MENU.About.icon}
                size={40}
                style={{
                  marginRight: 10,
                  color: THEME_COLOR
                }}
              />
              <Text>用户名</Text>
            </View>
          </TouchableOpacity>

          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Tutorial)}
          {/*趋势管理*/}
          <Text style={styles.groupTitle}>趋势管理</Text>
          {/*自定义语言*/}
          {this.getItem(MORE_MENU.Custom_Language)}
          {/*语言排序*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Sort_Language)}

          {/*最热管理*/}
          <Text style={styles.groupTitle}>最热管理</Text>
          {/*自定义标签*/}
          {this.getItem(MORE_MENU.Custom_Key)}
          {/*标签排序*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Sort_Key)}
          {/*标签移除*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Remove_Key)}

          {/*设置*/}
          <Text style={styles.groupTitle}>设置</Text>
          {/*自定义主题*/}
          {this.getItem(MORE_MENU.Custom_Theme)}
          {/*关于作者*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.About_Author)}
          <View style={GlobalStyles.line}/>
          {/*反馈*/}
          {this.getItem(MORE_MENU.Feedback)}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.CodePush)}
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
  about_left: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  }
});

// const mapStateToProps = state => ({
//   theme: state.theme.theme,
// });
//
// const mapDispatchToProps = dispatch => ({
//   onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
// });
//
// //注意：connect只是个function，并不应定非要放在export后面
// export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
