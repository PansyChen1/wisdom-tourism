import React, {Component} from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions

} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import BackPressComponent from "../common/BackPressComponent";
// import {Mock} from "mockjs";

const TITLE_COLOR = "#E96";
const width = Dimensions.get('window').width;

const Props = {};
export default class CustomPage extends Component<Props>{
  constructor(props) {
    super(props);
    this.state = {

    };
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
  }

  /**
   * 处理android中的物理返回键
   **/
  componentDidMount() {
    this.backPress.componentDidMount();
    // this._fetch();
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

  // _fetch() {
  //   fetch('http://rap2api.taobao.org/app/mock/163425/api/attractionsList')
  //     .then((response) => response.json())
  //     .then((response) => {
  //       var data = Mock.mock(response);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  render() {
    const {theme} = this.props;
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: "light-content",
    };

    let navigationBar = <NavigationBar
      title={"民俗"}
      statusBar={statusBar}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      style={{backgroundColor: TITLE_COLOR}}
    />;
    return (
      <View style={styles.container}>
        {navigationBar}
        {/*渲染列表*/}
        <FlatList
          data={[
            {
              "_id": "l)",
              "attraction_name": "孔子生迹园",
              "attraction_pic": "http://www.qlxcly.com/Public/business/product/1497417487.png",
              "attraction_star": "★★★★",
              "attraction_tag": "名人故居",
              "attraction_price": 15,
              "attraction_comments": [
                {
                  "attraction_comment_describe": "果八法发",
                  "attraction_comment_pic": "https://segmentfault.com/img/bVXki7?w=532&h=335"
                }
              ],
              "attraction_description": "台儿庄古城"
            },
            {
              "_id": "q&d",
              "attraction_name": "万紫千红度假区",
              "attraction_pic": "http://www.qlxcly.com/Public/business/product/1489108552.jpeg",
              "attraction_star": "★★★",
              "attraction_tag": "度假区",
              "attraction_price": 20,
              "attraction_comments": [
                {
                  "attraction_comment_describe": "农际外增",
                  "attraction_comment_pic": "https://segmentfault.com/img/bVXki7?w=532&h=335"
                }
              ],
              "attraction_description": "青岛海水湾是"
            },
            {
              "_id": ")NUVI",
              "attraction_name": "跑马岭",
              "attraction_pic": "http://www.qlxcly.com/Public/Upload/RecomPruduct/m_5593a8f7bfd03.jpg",
              "attraction_star": "★★★★",
              "attraction_tag": "古都",
              "attraction_price": 118,
              "attraction_comments": [
                {
                  "attraction_comment_describe": "亲好号世亲此",
                  "attraction_comment_pic": "https://segmentfault.com/img/bVXki7?w=532&h=335"
                }
              ],
              "attraction_description": "何置整马复"
            },
            {
              "_id": "eIwNH",
              "attraction_name": "章丘树莓",
              "attraction_pic": "http://www.qlxcly.com/Public/Upload/RecomPruduct/m_58982817626e1.jpg",
              "attraction_star": "★★★★",
              "attraction_tag": "古都",
              "attraction_price": 39,
              "attraction_comments": [
                {
                  "attraction_comment_describe": "效眼权公",
                  "attraction_comment_pic": "https://segmentfault.com/img/bVXki7?w=532&h=335"
                }
              ],
              "attraction_description": "重海强后离组"
            },
            {
              "_id": "l)",
              "attraction_name": "长清油菜花",
              "attraction_pic": "http://www.qlxcly.com/Public/Upload/RecomPruduct/m_58a69eb507f0d.jpg",
              "attraction_star": "★★★★",
              "attraction_tag": "自然",
              "attraction_price": 19,
              "attraction_comments": [
                {
                  "attraction_comment_describe": "果八法发",
                  "attraction_comment_pic": "https://segmentfault.com/img/bVXki7?w=532&h=335"
                }
              ],
              "attraction_description": "台儿庄古城"
            },
            {
              "_id": "q&d",
              "attraction_name": "青岛海泉湾",
              "attraction_pic": "http://www.qlxcly.com/Public/Upload/RecomPruduct/m_58b4f9f5751da.jpg",
              "attraction_star": "★★★",
              "attraction_tag": "海湾",
              "attraction_price": 136,
              "attraction_comments": [
                {
                  "attraction_comment_describe": "农际外增",
                  "attraction_comment_pic": "https://segmentfault.com/img/bVXki7?w=532&h=335"
                }
              ],
              "attraction_description": "青岛海水湾是"
            },
          ]}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => {
                NavigationUtil.goPage({theme}, 'HousePage')
              }}
            >
              <View style={styles.item}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <Image
                    source={{uri: item.attraction_pic}}
                    style={styles.attraction_pic}
                  />
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
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
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
  attraction_pic: {
    width: width / 2.4,
    height: width / 2.8,
    borderRadius: 5
  },
  attraction_name: {
    paddingRight:width/5.6,
    fontSize: 22,
    color: '#333',
    fontFamily: ''
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },
  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 -0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  attraction_description: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 25,
    marginRight: 5
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
