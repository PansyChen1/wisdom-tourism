import React, {Component} from 'react';
import {StyleSheet, View, RefreshControl, TouchableOpacity, FlatList, TextInput, Text, ActivityIndicator, } from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil"
import {connect} from "react-redux";
import actions from "../action/index";
import NavigationBar from "../common/NavigationBar";
import {DeviceInfo}from 'react-native';
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import BackPressComponent from "../common/BackPressComponent";
import Utils from "../util/Util";
import GlobalStyles from "../res/styles/GlobalStyles";
import PopularItem from "../common/PopularItem";
import ViewUtil from "../util/ViewUtil";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";
import Toast from 'react-native-easy-toast'
import FavoriteUtil from "../util/FavoriteUtil";

const URL = "https://api.github.com/search/repositories?q=";
const QUERY_STR = "&sort=stars";
const TITLE_COLOR = "#678";
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
const THEME_COLOR = '#678';

type Props = {};

class SearchPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
    this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
    // this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.isKeyChange = false;
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  loadData(loadMore) {
    const {onLoadMoreSearch, onSearch, search, keys} = this.props;
    if (loadMore) {
      onLoadMoreSearch(search.pageIndex, pageSize, search.items, this.favoriteDao, callback=>{
        this.refs.toast.show("没有更多了");
      });
    }else {
      onSearch(this.inputKey, pageSize, this.searchToken = new Date().getTime(), this.favoriteDao, key, message => {
        this.refs.toast.show(message);
      });
    }
  }

  //对返回键的处理
  onBackPress() {
    const {onSearchCancel} = this.props;
    onSearchCancel();//退出时取消搜索
    this.refs.input.blur();//点击返回键时收起键盘
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }

  renderItem(data) {
    const item = data.item;
    return <PopularItem
      projectModel={item}
      onSelect={(callback) => {
        NavigationUtil.goPage({
          projectModel: item,
          flag: FLAG_STORAGE.flag_popular,
          callback,
        }, 'DetailPage')
      }}
      onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
    />
  }

  genIndicator() {
    const {search} = this.props;
    return search.hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }


  onRightButtonClick() {
    const {onSearchCancel, search} = this.props;
    if (search.showText === '搜索') {
      this.loadData();
    } else {
      onSearchCancel(this.searchToken);
    }
  }

  renderNavBar() {
    const {theme} = this.params;
    const {showText, inputKey} = this.props.search;
    const placeholder = inputKey || "请输入";
    let backButton = ViewUtil.getLeftBackButton(() => this.onBackPress());
    let inputView = <TextInput
      ref="input"
      placeholder={placeholder}
      onChangeText={text => this.inputKey = text}
      style={styles.textInput}
    >
    </TextInput>;
    let rightButton =
      <TouchableOpacity
        onPress={() => {
          this.refs.input.blur();//收起键盘
          this.onRightButtonClick();
        }}
      >
        <View style={{marginRight: 10}}>
          <Text style={styles.title}>{showText}</Text>
        </View>
      </TouchableOpacity>;
    return <View style={{
      backgroundColor: THEME_COLOR,
      flexDirection: 'row',
      alignItems: 'center',
      height: GlobalStyles.nav_bar_height_android,
    }}>
      {backButton}
      {inputView}
      {rightButton}
    </View>
  }


  /**
   * 添加标签
   **/
  saveKey() {
    const {keys} = this.props;
    let key = this.inputKey;
    if (Utils.checkKeyIsExist(keys, key)) {
      this.toast.show(key + '已经存在');
    } else {
      key = {
        "path": key,
        "name": key,
        "checked": true
      };
      keys.unshift(key);//将key添加到数组的开头
      this.toast.show(key.name + '保存成功');
      this.isKeyChange = true;
    }
  }

  render() {
    const {isLoading, projectModels, showBottomButton, hideLoadingMore} = this.props.search;
    let statusBar = null;
    // if (Platform.OS === 'ios') {
    //   statusBar = <View style={styles.statusBar}/>
    // }
    let listView = !isLoading ? <FlatList
      data={projectModels}
      renderItem={data => this.renderItem(data)}
      keyExtractor={item => "" + item.item.id}
      //安全距离
      contentInset={
        {
          bottom: 45
        }
      }
      refreshControl={
        <RefreshControl
          title={'Loading'}
          titleColor={THEME_COLOR}
          colors={THEME_COLOR}
          refreshing={isLoading}
          onRefresh={() => this.loadData()}
          tintColor={THEME_COLOR}
        />
      }
      ListFooterComponent={() => this.genIndicator()}
      onEndReached={() => {
        console.log('---onEndReached----');
        setTimeout(() => {
          if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
            this.loadData(true);
            this.canLoadMore = false;
          }
        }, 100);
      }}
      onEndReachedThreshold={0.5}
      onMomentumScrollBegin={() => {
        this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
        console.log('---onMomentumScrollBegin-----')
      }}
    /> : null;
    let bottomButton = showBottomButton ?
      <TouchableOpacity
        style={[styles.bottomButton, {backgroundColor: THEME_COLOR}]}
        onPress={() => {
          this.saveKey();
        }}
      >
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.title}>朕收下了</Text>
        </View>
      </TouchableOpacity> : null;
    let indicatorView = isLoading ?
      <ActivityIndicator
        style={styles.centering}
        size='large'
        animating={isLoading}
      /> : null;
    let resultView = <View style={{flex: 1}}>
      {indicatorView}
      {listView}
    </View>;
    return <SafeAreaViewPlus
      style={GlobalStyles.root_container}
      topColor={THEME_COLOR}
    >
      {statusBar}
      {this.renderNavBar()}
      {resultView}
      {bottomButton}
      <Toast ref={toast => this.toast = toast}/>
    </SafeAreaViewPlus>
  }

}


const mapStateToProps = state => ({
  search: state.search,
  // keys: state.language.keys,
});
const mapDispatchToProps = dispatch => ({
  //将dispatch(actions.onRefreshPopular(storeName, url, pageSize))绑定到props
  onSearch: (inputKey, pageSize, token, favoriteDao, popularKeys, callBack) => dispatch(actions.onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callBack)),
  onSearchCancel: (token) => dispatch(actions.onSearchCancel(token)),
  onLoadMoreSearch: (pageIndex, pageSize, dataArray, favoriteDao, callBack) => dispatch(actions.onLoadMoreSearch(pageIndex, pageSize, dataArray, favoriteDao, callBack)),
  // onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

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
  },
  statusBar: {
    height: 20
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    height: 40,
    position: 'absolute',
    left: 10,
    top: GlobalStyles.window_height - 45,
    right: 10,
    borderRadius: 3
  },
  textInput: {
    flex: 1,
    height: 36,
    borderWidth: 0,
    borderColor: "white",
    alignSelf: 'center',
    paddingLeft: 5,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 3,
    opacity: 0.7,
    color: 'white'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "500"
  }
});
