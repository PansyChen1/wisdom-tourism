import React, {Component} from "react";
import Scroll from "../common/Scroll";
import NavigationBar from "../common/NavigationBar";
import {DeviceInfo, TouchableOpacity, View, Text,Image} from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ListPage from "./ListPage";
import {Geolocation} from "react-native-baidu-map";
//
// const Geolocation = require('Geolocation');
const TITLE_COLOR = "#678";

export default class FirstPage extends Component {
  getLocation(){
    Geolocation.reverseGeoCodeGPS(116.58, 35.42)
      .then(data => {
        alert('reverseGeoCodeGPS:' + data);
      })
      .catch(e => {
        console.log(e, "error");
      })
  }

  // getLocation(){
  //   Geolocation.getCurrentPosition(
  //     location => {
  //       var result = "\n经度：" + location.coords.longitude +
  //         "\n纬度：" + location.coords.latitude +
  //         "\n准确度：" + location.coords.accuracy +
  //         "\n行进方向：" + location.coords.heading +
  //         "\n海拔：" + location.coords.altitude +
  //         "\n海拔准确度：" + location.coords.altitudeAccuracy +
  //         "\n时间戳：" + location.timestamp;
  //       alert(result);
  //     },
  //     error => {
  //       alert("获取位置失败："+ error)
  //     }
  //   );
  // }

  renderLeftButton() {
    return <TouchableOpacity
      onPress={this.getLocation.bind(this)}
    >
      <View style={{padding: 5, marginLeft: 8}}>
        <AntDesign
          name={"enviromento"}
          size={24}
          style={{
            marginLeft: 8,
            alignSelf: 'center',
            color: 'white',
          }}
        />
      </View>
    </TouchableOpacity>
  }
  renderRightButton() {
    const {theme} = this.props;
    return <TouchableOpacity
      onPress={() => {
        // AnalyticsUtil.track("SearchButtonClick");
        NavigationUtil.goPage({theme}, 'SearchPage')
      }}
    >
      <View style={{padding: 5, marginRight: 8}}>
        <Ionicons
          name={'ios-search'}
          size={24}
          style={{
            marginRight: 8,
            alignSelf: 'center',
            color: 'white',
          }}/>
      </View>
    </TouchableOpacity>
  }
  render() {
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: "light-content",
    };

    let navigationBar = <NavigationBar
      title={"首页"}
      statusBar={statusBar}
      style={{backgroundColor: TITLE_COLOR}}
      rightButton={this.renderRightButton()}
      leftButton={this.renderLeftButton()}
    />
    return (
      <View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
        {navigationBar}
        <Scroll/>
        <ListPage/>

        <View style={styles.hotPlace}>
          <Text style={{fontSize:20, alignSelf:"center"}}>
            ---------- 热门目的地
            <AntDesign
              name={"right"}
              size={18}
            />
            <Text> ----------</Text>
          </Text>
          <View style={styles.hotPlacePic}>
            <Image
              source={require("../images/1.png")}
              style={{width:100,height:60}}
            />
            <Image
              source={require("../images/1.png")}
              style={{width:100,height:60}}
            />
            <Image
              source={require("../images/1.png")}
              style={{width:100,height:60}}
            />
          </View>

        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex:1,
    marginTop:-10
  },
  hotPlace: {
    marginTop: 20,
    justifyContent:"space-around",
  },
  hotPlacePic:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:20,
  }
};