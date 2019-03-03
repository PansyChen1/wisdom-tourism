import React, {Component} from 'react';
import {TouchableOpacity, Button, StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil"
import DetailPage from "./DetailPage";
import {connect} from "react-redux";
import action from "../action/index";
import actions from "../action/index";
import PopularItem from "../common/PopularItem";
import Toast from "react-native-easy-toast";
import NavigationBar from "../common/NavigationBar";
import {DeviceInfo}from 'react-native';
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import AnalyticsUtil from "../util/AnalyticsUtil";
import Ionicons from "react-native-vector-icons/Ionicons";

const URL = "https://api.github.com/search/repositories?q=";
const QUERY_STR = "&sort=stars";
const TITLE_COLOR = "#678";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

type Props = {};
export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabNames = ['景点', '美食', '特产', '民宿', '民俗'];
  }

  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        //初始化页面，传递参数
        screen: props => <PopularTabPage {...props} tabLabel={item}/>,
        navigationOptions: {
          title: item
        }
      }
    });
    return tabs;
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
    }

    let navigationBar = <NavigationBar
      title={"旅游信息"}
      statusBar={statusBar}
      style={{backgroundColor: TITLE_COLOR}}
      rightButton={this.renderRightButton()}
    />

    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          // scrollEnabled: true,//是否支持选项卡滚动
          style: {
            backgroundColor: '#678' //tabBar的背景色
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle
        }
      })
    );
    return <View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
      {navigationBar}
      <TabNavigator/>
    </View>
  }
}
const pageSize = 10;//设置常量，防止修改
class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;//tabLabel是景点 美食这样的关键字
  }

  componentDidMount() {
    this.loadData();
  }
  loadData(loadMore) {
    const {onRefreshPopular, onLoadMorePopular} = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback=>{
        this.refs.toast.show("没有更多了");
      });
    }else {
      onRefreshPopular(this.storeName, url, pageSize, favoriteDao);
    }
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   * **/
  _store() {
    const {popular} = this.props;
    let store = popular[this.storeName];
    if(!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],//要显示的数据
        hideLoadingMore: true, //默认隐藏加载更多
      }
    }
    return store;
  }
  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const item = data.item;
    return <PopularItem
      projectModel={item}
      onSelect={(callback) => {
        NavigationUtil.goPage({
          projectModel: item,
          flag: FLAG_STORAGE.flag_popular.self,
          callback,
        }, 'DetailPage')
      }}
      onFavorite={(item, isFavorite) => {
        FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular.self)
      }}
    />
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  render() {
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => "" + item.item.id}
          refreshControl={
            <RefreshControl
              title={"Loading"}
              titleColor={TITLE_COLOR}
              colors={[TITLE_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={TITLE_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            setTimeout(() => {//fix 滚动时两次调用onEndReached的问题
              if(this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            },100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;//fix 初始化滚动调用onEndReached的问题
          }}
        />
        <Toast
          ref={"toast"}
          position={"center"}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular,
});
const mapDispatchToProps = dispatch => ({
  //将dispatch(actions.onRefreshPopular(storeName, url, pageSize))绑定到props
  onRefreshPopular: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    //fix 会导致在android手机上列表加载慢
    // minWidth: 35
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    marginBottom: 6,
    marginTop: 6
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: 10
  }
});
