import React, {Component} from 'react';
import {WebView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import ModalDropdown from 'react-native-modal-dropdown';

type Props = {};
const TITLE_COLOR = "#678";
const width = Dimensions.get('window').width;
export default class AnotherDetailPage extends Component<Props> {
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

  render() {
    const {theme} = this.props;
    let navigationBar = <NavigationBar
      title={"详情页"}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      style={{backgroundColor: TITLE_COLOR}}
      rightButton={this.renderRightButton()}
    />;
    return (
      <View style={styles.container}>
        {navigationBar}
        <Image
          source={{uri:"http://www.qlxcly.com/Public/Upload/RecomPruduct/m_589d32da4792e.jpg"}}
          style={{width:width,height:250}}
        />
        <View style={styles.content}>
          <FlatList
            data={[
              {
                "_id": "l)",
                "attraction_name": "台儿庄古城",
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
                "attraction_name": "游玩指南",
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
        </View>
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
  }
});
