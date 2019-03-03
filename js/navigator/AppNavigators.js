import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import FetchDemoPage from "../page/FetchDemoPage";
import AsyncStorageDemoPage from "../page/AsyncStorageDemoPage";
import DataStoreDemoPage from "../page/DataStoreDemoPage";
import {connect} from "react-redux";
import {createReactNavigationReduxMiddleware, createReduxContainer} from "react-navigation-redux-helpers";
import WebViewPage from "../page/WebViewPage";
import SearchPage from "../page/SearchPage";

export const rootCom = "Init"//设置根路由

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions:{
      header: null,// 隐藏顶部的导航
    }
  }
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions:{
      header: null,// 隐藏顶部的导航
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions:{
      header: null,// 隐藏顶部的导航
    }
  },
  WebViewPage: {
    screen: WebViewPage,
    navigationOptions: {
      header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
  },
});

export const RootNavigator = createAppContainer(
  createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
  },{
    navigationOptions:{
      header: null,// 隐藏顶部的导航
    }
  })
);

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为createReduxContainer的key设置actionSubscribers（行为订阅者）
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers
 * **/
export const middleware = createReactNavigationReduxMiddleware(
  state => state.key,
  'root',
);
/**
 * 2.将根导航器组件传递给createReduxContainer函数，
 * 并返回一个将Navigation State和dispatch函数作为props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 * **/
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 * **/
const mapStateToProps = state => ({
  state: state.nav,
})

/**
 * 3.连接React组件与 Redux store
 * **/
export default connect(mapStateToProps)(AppWithNavigationState);

