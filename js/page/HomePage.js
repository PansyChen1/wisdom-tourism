import React, {Component} from 'react';
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import {BackHandler} from "react-native";//处理物理返回键
import {NavigationActions} from "react-navigation";
import actions from "../action";
import {connect} from "react-redux";
import BackPressComponent from "../common/BackPressComponent";

type Props = {};
class HomePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.backPress = new BackPressComponent({backPress: this.onBackPress()});
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  /**
   * 处理android中的物理返回键
   * **/
  onBackPress = () => {
    const {dispatch, nav} = this.props;
    if(nav.routes[1].index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }
  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator/>;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  theme: state.theme
});
export default connect(mapStateToProps)(HomePage);
