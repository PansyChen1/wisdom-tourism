import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
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

const TITLE_COLOR = "#678";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular.other);

type Props = {};
export default class FavoritePage extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: "light-content",
    }

    let navigationBar = <NavigationBar
      title={"收藏"}
      statusBar={statusBar}
      style={{backgroundColor: TITLE_COLOR}}
    />

    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator({
        'Attraction': {
          screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular.other.flag_attraction}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
          navigationOptions: {
            title: '景点',
          },
        },
        'Food': {
          screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular.other.flag_food}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
          navigationOptions: {
            title: '美食',
          },
        },
        'Specialty': {
          screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular.other.flag_specialty}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
          navigationOptions: {
            title: '特产',
          },
        },
        'House': {
          screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular.other.flag_house}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
          navigationOptions: {
            title: '民宿',
          },
        },
        'Custom': {
          screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular.other.flag_custom}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
          navigationOptions: {
            title: '民俗',
          },
        },
      }, {
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

class FavoriteTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {flag} = this.props;
    this.storeName = flag;//tabLabel是景点 美食这样的关键字
    this.favoriteDao = new FavoriteDao(flag);
  }

  componentDidMount() {
    this.loadData();
  }
  loadData(isShowLoading) {
    const {onLoadFavoriteData} = this.props;
    onLoadFavoriteData(this.storeName, isShowLoading);
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   * **/
  _store() {
    const {favorite} = this.props;
    let store = favorite[this.storeName];
    if(!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],//要显示的数据
      }
    }
    return store;
  }

  renderItem(data) {
    // const item = data.item;
    const Item = this.storeName;
    return <Item
      projectModel={item}
      onSelect={(callback) => {
        NavigationUtil.goPage({
          projectModel: item,
          flag: this.storeName,
          callback,
        }, 'DetailPage')
      }}
      onFavorite={(item, isFavorite) => {
        FavoriteUtil.onFavorite(favoriteDao[i], item, isFavorite, this.storeName)
      }}
    />
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
              onRefresh={() => this.loadData(true)}
              tintColor={TITLE_COLOR}
            />
          }
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
  favorite: state.favorite,
});

const mapDispatchToProps = dispatch => ({
  //将 dispatch(onRefreshPopular(storeName, url))绑定到props
  onLoadFavoriteData: (storeName, isShowLoading) => dispatch(actions.onLoadFavoriteData(storeName, isShowLoading)),
});

//注意：connect只是个function，并不应定非要放在export后面
const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab);


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
