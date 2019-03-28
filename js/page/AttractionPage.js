import React, {Component} from "react";
import ImagePicker from 'react-native-image-picker';
import BaiduMap from "../common/BaiduMap";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,

} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import BackPressComponent from "../common/BackPressComponent";

const TITLE_COLOR = "#678";

const Props = {};
export default class attractionPage extends Component<Props>{
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      videoSource: null,
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



  render() {
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: "light-content",
    };

    let navigationBar = <NavigationBar
      title={"景点"}
      statusBar={statusBar}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      style={{backgroundColor: TITLE_COLOR}}
    />;
    return (
      <View style={styles.container}>
        {navigationBar}
        <Text>test</Text>
        { this.state.videoSource &&
        <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  avatarContainer: {
    borderColor: '#678',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100
  },
  buttonFlex: {
    marginTop: 60,
    justifyContent:"center",
    alignItems: 'center'
  }
});
