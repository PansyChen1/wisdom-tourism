import React, {Component} from "react";
import Scroll from "../common/Scroll";
import NavigationBar from "../common/NavigationBar";
import {DeviceInfo, TouchableOpacity, View, Text, Image, ScrollView, FlatList, Dimensions} from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ListPage from "./ListPage";
import {Geolocation} from "react-native-baidu-map";
//
// const Geolocation = require('Geolocation');
const TITLE_COLOR = "#678";
const width = Dimensions.get('window').width;

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: [
        {
          title: '岁末清扫有它们，体验大不同',
          describe: '更轻松、更美好的大扫除攻略',
          price: '9.9元起',
        },
        {
          title: '新年一点红，幸运一整年',
          describe: '那些让你“红”运当头的好物',
          price: '9.9元起',
        },
      ]
    }
  }
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


  renderTopicItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.topicItem}>
        <Image source={require('../images/1.png')} style={styles.topicImg} />
        <View style={styles.topicContainer}>
          <View style={styles.topicText}>
            <Text style={styles.topicTitle}>{item.title}</Text>
            <Text style={styles.topicDesc}>{item.describe}</Text>
          </View>
          <Text style={styles.topicPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    )
  };

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
        <ScrollView>
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
              <FlatList
                data={this.state.topic}
                keyExtractor={(item, index) => index}
                renderItem={this.renderTopicItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />

            </View>

          </View>
        </ScrollView>
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
    marginTop: 35,
    justifyContent:"space-around",
  },
  hotPlacePic:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:20,
  },
  topic: {
    width: width,
    alignItems:'center',
    backgroundColor: '#fff',
    paddingBottom:10,
    marginBottom:10,
  },
  topicHead:{
    fontSize:16,
    color:'#666',
    padding:15,
  },
  topicItem: {
    width: width*0.7,
    marginLeft:15,
  },
  topicImg: {
    width: width*0.7,
    height: width*0.4,
    borderWidth:0.5,
    borderColor:'#cdcdcd',
    borderRadius:2,
  },
  topicContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop:10,
  },
  topicTitle:{
    fontSize:16,
    color:'#666',
  },
  topicDesc:{
    fontSize:13,
    color:'#999',
    marginTop:3,
  },
  topicPrice:{
    fontSize:14,
    color:'#b4282d',
  },
};