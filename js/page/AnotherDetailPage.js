import React, {Component} from 'react';
import {WebView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";

type Props = {};
const TITLE_COLOR = "#678";
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

  render() {
    let navigationBar = <NavigationBar
      title={"详情页"}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      style={{backgroundColor: TITLE_COLOR}}
    />;
    return (
      <View style={styles.container}>
        {navigationBar}
        <Text>DetailPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
