import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil"
import DetailPage from "./DetailPage";
import {connect} from "react-redux";
import action from "../action/index";
import actions from "../action/index";
import Toast from "react-native-easy-toast";
import NavigationBar from "../common/NavigationBar";
import TrendingItem from "../common/TrendingItem";

const URL = 'https://github.com/trending/';
const QUERY_STR = "&sort=stars";
const TITLE_COLOR = "#E96";

type Props = {};
export default class TrendingPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabNames = ['All', 'C', 'C++',];
  }

  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        //初始化页面，传递参数
        screen: props => <TrendingTabPage {...props} tabLabel={item}/>,
        navigationOptions: {
          title: item
        }
      }
    });
    return tabs;
  }

  render() {
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: "light-content",
    }

    let navigationBar = <NavigationBar
      title={"信息查询"}
      statusBar={statusBar}
      style={{backgroundColor: TITLE_COLOR}}
    />

    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          // scrollEnabled: true,//是否支持选项卡滚动
          style: {
            backgroundColor: '#E96' //tabBar的背景色
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle
        }
      })
    );
    return <View style={{flex: 1}}>
      {navigationBar}
      <TabNavigator/>
    </View>
  }
}
const pageSize = 10;//设置常量，防止修改
class TrendingTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;//tabLabel是景点 美食这样的关键字
  }

  componentDidMount() {
    this.loadData();
  }
  loadData(loadMore) {
    const {onRefreshTrending, onLoadMoreTrending} = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, callback=>{
        this.refs.toast.show("没有更多了");
      });
    }else {
      onRefreshTrending(this.storeName, url, pageSize);
    }
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   * **/
  _store() {
    const {trending} = this.props;
    let store = trending[this.storeName];
    if(!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],//要显示的数据
        hideLoadingMore: true, //默认隐藏加载更多r
      }
    }
    return store;
  }
  genFetchUrl(key) {
    return URL + key + '?since=daily';
  }

  renderItem(data) {
    const item = data.item;
    return <TrendingItem
      item={item}
      onSelect={() => {

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
          keyExtractor={item => "" + (item.id || item.fullName)}
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
  trending: state.trending,
});
const mapDispatchToProps = dispatch => ({
  //将dispatch(actions.onRefreshTrending(storeName, url, pageSize))绑定到props
  onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack)),
});

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    minWidth: 35
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
