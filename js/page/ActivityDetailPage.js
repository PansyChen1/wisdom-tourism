import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Button,
  Modal,
  Alert
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";
import Feather from "react-native-vector-icons/Feather";

import ModalDropdown from 'react-native-modal-dropdown';
import OrderPage from "./OrderPage";

type Props = {};
const TITLE_COLOR = "#678";
const width = Dimensions.get('window').width;
export default class AnotherDetailPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,

      animationType: 'none',//none slide fade
      modalVisible: true,//模态场景是否可见
      transparent: true,//是否透明显示
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

  renderRightButton() {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => {

        }}
      >
        <ModalDropdown
          defaultValue={
            <Feather
              name={"more-vertical"}
              size={20}
              color={"#fff"}
            />
          }
          options={['首页','收藏', '分享',]}
          dropdownStyle={{
            height: 110,
            width: 80,
            borderRadius:10,
            alignItems: 'center'
          }}
        />
      </TouchableOpacity>
    )
  }

  // modalShow() {
  //   return (
  //     <Alert></Alert>
  //   )
  // }

  render() {
    const {theme} = this.props;
    let navigationBar = <NavigationBar
      title={"活动详情页"}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      style={{backgroundColor: TITLE_COLOR}}
      rightButton={this.renderRightButton()}
    />;
    let alertMessage = '姓名：' + '手机号：' + '身份证号：';
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          <Image
            // source={{uri:"../images/activityExample"}}
            source={require('../images/activityExample.jpg')}
            style={{width:width,height:250}}
          />
          <View style={styles.content}>
            <FlatList
              data={[
                {
                  "_id": "l)",
                  "attraction_name": "邹城张庄镇桑北村果园",
                  "attraction_pic": "http://www.qlxcly.com/Public/business/product/55c9ba10d1326.jpg",
                  "attraction_star": "★★★★",
                  "attraction_tag": "采摘",
                  "attraction_price": "30",
                  "attraction_comments": [
                    {
                      "attraction_comment_describe": "果八法发",
                      "attraction_comment_pic": "https://segmentfault.com/img/bVXki7?w=532&h=335"
                    }
                  ],
                  "attraction_description": "台儿庄古城"
                },
              ]}
              renderItem={({item}) =>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <View>
                        <View style={styles.title}>
                          <Text style={styles.attraction_name}>{item.attraction_name}</Text>

                          <TouchableOpacity
                            style={styles.order}
                            onPress={
                              ()=> {
                                Alert.alert(
                                  `预定信息`,
                                  alertMessage,
                                  [
                                    {text: '以后再说', onPress: () => console.log('Ask me later pressed')},
                                    {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: '确定', onPress: () => console.log('OK Pressed')},
                                  ]
                                )
                              }
                            }
                          >
                            <Text style={{color: "#fff",fontSize:16}}>立即预订</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: "row",  marginTop: 10}}>
                          <Text style={{fontSize: 16}}>推荐指数：</Text>
                          <Text style={{marginRight: width/7.1}}>{item.attraction_star}</Text>
                        </View>
                        <Text style={{color: "#f55",fontSize: 18,marginTop:10}}>¥{item.attraction_price}</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                          <Text style={styles.attraction_tag}>{item.attraction_tag}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              }
            />
            <FlatList
              data={[
                {
                  "_id": "l)",
                  "attraction_name": "购买须知",
                  "attraction_star": "★★★★",
                  "attraction_tag": "古城",
                },
              ]}
              renderItem={({item}) =>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <View>
                        <Text style={styles.attraction_name}>{item.attraction_name}</Text>
                        <View style={{flexDirection: "row",  marginTop: 10}}>
                          <Text style={{fontSize: 16}}>【产品名称】</Text>
                          <Text style={{marginRight: width/7.1}}>
                            济宁邹城世外家园
                          </Text>
                        </View>
                        <View style={{flexDirection: "row",  marginTop: 10}}>
                          <Text style={{fontSize: 16}}>【采摘品种】</Text>
                          <Text style={{marginRight: width/7.1}}>
                            樱桃 5月份 树莓7月份
                          </Text>
                        </View>
                        <View style={{flexDirection: "row",  marginTop: 10}}>
                          <Text style={{fontSize: 16}}>【景区地址】</Text>
                          <Text style={{marginRight: width/7.1}}>
                            济宁邹城张庄镇桑北村
                          </Text>
                        </View>
                        <View style={{flexDirection: "row",  marginTop: 10}}>
                          <Text style={{fontSize: 16}}>【购买流程】</Text>
                          <Text style={{marginRight: width/7.1}}>
                            订购并预留取票人信息→付款并查收入园凭证短信→凭短信取票或验证入园游玩
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              }
            />
            <FlatList
              data={[
                {
                  "_id": "l)",
                  "attraction_name": "活动介绍",
                  "attraction_pic": "http://www.qlxcly.com/Public/Upload/RecomPruduct/m_589d32da4792e.jpg",
                  "attraction_star": "★★★★",
                  "attraction_tag": "古城",
                  "attraction_price": 19,
                  "attraction_comments": [
                    {
                      "attraction_comment_describe": "果八法发",
                      "attraction_comment_pic": "https://segmentfault.com/img/bVXki7?w=532&h=335"
                    }
                  ],
                  "attraction_description": "台儿庄古城"
                },
              ]}
              renderItem={({item}) =>
                <TouchableOpacity
                  onPress={() => {
                    NavigationUtil.goPage({theme}, 'AnotherDetailPage')
                  }}
                >
                  <View style={styles.item}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <View>
                        <Text style={styles.attraction_name}>{item.attraction_name}</Text>
                        <View style={{flexDirection: "row", justifyContent: "center", marginTop: 10}}>
                          <Text style={{fontSize: 16}}>
                            邹城市世外家园饭店位于孟子故里的张庄镇桑北村，该农家乐依水库而建，环境优美，院落整洁，设施齐全，具有浓厚的乡村气息，以儒家传统文化为主题,以乡村礼俗为载体，大力发展孟子故里的农家文化。
                          </Text>
                          {/*<Text style={{marginRight: width/7.1}}>{item.attraction_star}</Text>*/}
                        </View>
                        {/*<Text style={{color: "#f55",fontSize: 18,marginTop:10}}>¥{item.attraction_price}</Text>*/}
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                          {/*<Text style={styles.attraction_tag}>{item.attraction_tag}</Text>*/}
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              }
            />
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
  },
  item: {
    backgroundColor: "white",
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: "#ddd",
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: "gray",
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  attraction_name: {
    paddingRight:width/5.6,
    fontSize: 22,
    color: '#333',
    fontFamily: ''
  },
  attraction_tag: {
    paddingLeft: 15,
    lineHeight:28,
    borderWidth:1,
    width: 60,
    height: 28,
    borderRadius:20,
    color: "#029",
    borderColor: "#029"
  },
  title: {
    flexDirection: "row",
  },
  order: {
    // paddingLeft: 10,
    lineHeight:35,
    borderWidth:1,
    width: 90,
    height: 30,
    borderRadius:6,
    borderColor: "#049",
    backgroundColor: "#049",
    alignItems: "center",
  }
});
