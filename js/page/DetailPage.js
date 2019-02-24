import React, {Component} from 'react';
import {WebView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";

const TRENDING_URL = "https://github.com/";
type Props = {};
const TITLE_COLOR = "#678"
export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props);
    //从导航器中将params取出
    this.params = this.props.navigation.state.params;
    const {projectModel} = this.params;
    // this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
    // const title = projectModel.full_name || projectModel.fullName;
    const title = "test";
    this.url = "https://github.com/";
    this.state = {
      title: title,
      url: this.url,
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
    return (<View style={{flexDirection: "row"}}>
      <TouchableOpacity
        onPress={() => {

        }}
      >
        <FontAwesome
          name={"star-o"}
          size={20}
          style={{color: "white", marginRight: 10, marginTop: 8}}
        />
      </TouchableOpacity>
      {ViewUtil.getShareButton(() => {

      })}
    </View>)
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    })
  }

  render() {
    let navigationBar = <NavigationBar
      title={this.state.title}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      style={{backgroundColor: TITLE_COLOR}}
      rightButton={this.renderRightButton()}
    />
    return (
      <View style={styles.container}>
        {navigationBar}
        <Text>DetailPage</Text>
        {/*<WebView*/}
          {/*ref={webView => this.webView = webView}*/}
          {/*startInLoadingState={true}*/}
          {/*onNavigationStateChange={e => this.onNavigationStateChange(e)}*/}
          {/*source={{uri: this.state.url}}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
