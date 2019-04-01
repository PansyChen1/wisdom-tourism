import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from 'react-native';

import { MapView,MapTypes,Geolocation} from 'react-native-baidu-map';

import Dimensions from 'Dimensions';
import NavigationBar from "./NavigationBar";
import ViewUtil from "../util/ViewUtil";
import BackPressComponent from "./BackPressComponent";
import NavigationUtil from "../navigator/NavigationUtil";
const { width,height } = Dimensions.get('window');
const TITLE_COLOR = "#678";

export default class BaiduMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomControlsVisible: true,
      trafficEnabled: true,
      baiduHeatMapEnabled: false,
      mapType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 113.896198,
        latitude: 22.959144,
      },
      markers: [
        {
          longitude: 113.896198,
          latitude: 22.959144,
          title: 'title',
        }
      ],
      clickMessage: '',
      poiMessage: '',
      canGoBack: false,
    };
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
  }

  /**
   * 处理android中的物理返回键
   **/
  componentDidMount() {
    this.backPress.componentDidMount();
    // 实现定位
    Geolocation.getCurrentPosition().then(
      (data) => {
        this.setState({
          zoom:18,
          markers: [{
            latitude: data.latitude,
            longitude: data.longitude,
            title: "我的位置"
          }],
          center: {
            latitude: data.latitude,
            longitude: data.longitude
          }
        })
      }
    ).catch(error => {
      console.warn(error, "error");
    })
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
    let navigationBar = <NavigationBar
      title={"导航"}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      style={{backgroundColor: TITLE_COLOR}}
    />;
    return (
      <View>
        {navigationBar}
        <MapView
          zoomControlsVisible={this.state.zoomControlsVisible} //默认true,是否显示缩放控件,仅支持android
          trafficEnabled={this.state.trafficEnabled} //默认false,是否显示交通线
          baiduHeatMapEnabled={this.state.baiduHeatMapEnabled} //默认false,是否显示热力图
          mapType={this.state.mapType} //地图模式,NORMAL普通 SATELLITE卫星图
          zoom={this.state.zoom} //缩放等级,默认为10
          center={this.state.center} // 地图中心位置
          markers={this.state.markers}

          onMapLoaded={(e) => { //地图加载事件
            Geolocation.getCurrentPosition()
              .then(data => {
                console.log(data)
                // this.setState({
                //     center: {
                //         longitude: data.longitude,
                //         latitude: data.latitude
                //     },
                //     markers: [{
                //         longitude: data.longitude,
                //         latitude: data.latitude,
                //         title: data.district + data.street
                //     }]
                // })
              })
              .catch(e => {
                console.warn(e, 'error');
              })
          }}

          style={styles.map}
          onMapClick={(e) => {}}
        >

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: width,
    height: height,
    marginBottom: 5,
  },
  list: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 5,
  }
});