import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";

cosnt
type Props = {};
export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props);
    //从导航器中将params取出
    this.params = this.props.navigation.state.params;
    const {projectModel} = this.params;
    this.url = projectModel.html_url || projectModel.fullname;
    this.state = {
      title:
    }
  }
  onBack() {

  }

  render() {
    let navigationBar = <NavigationBar
      title={"旅游信息"}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      statusBar={statusBar}
      style={{backgroundColor: TITLE_COLOR}}
    />
    return (
      <View style={styles.container}>
        {navigationBar}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
