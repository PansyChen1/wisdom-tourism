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
  }
});

const loadingRoute = createAppContainer(
  createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
  },{
    navigationOptions:{
      header: null,// 隐藏顶部的导航
    }
  })
);

export default loadingRoute;