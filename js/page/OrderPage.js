import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View, Dimensions
} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";

const width = Dimensions.get('window').width;
export default class OrderPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animationType: 'none',//none slide fade
      modalVisible: true,//模态场景是否可见
      transparent: true,//是否透明显示
    };
  }

  render() {
    let modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
    };
    let innerContainerTransparentStyle = this.state.transparent
      ? { backgroundColor: '#fff', padding: 20 }
      : null;
    const {theme} = this.props;

    return (

      <View style={{ alignItems: 'center', flex: 1 }}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
        >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text style={styles.date}>提示</Text>
              <View style={{marginTop: 10, fontSize:18}}>
                <Text style={{fontSize:18}}>点击开始导游按钮，您可以体验在景区内的导游功能，想试试吗？</Text>
              </View>
              <View style={styles.buttonStyle}>
                <View style={[styles.mp10, styles.btn]}>
                  <Text
                    onPress={() => {
                      NavigationUtil.goPage({theme}, 'BaiduMap')
                    }}
                    style={styles.btn_text}
                  >开始导游</Text>
                </View>
                <View>
                  <Text
                    onPress={this._setModalVisible.bind(this, false)}
                    // onPress={() => {
                    //   NavigationUtil.goPage({theme}, 'FirstPage')
                    // }}
                    style={{
                      width: 80,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#aaa',
                      padding: 5,
                      textAlign: 'center',
                      marginTop: 10,
                      lineHeight: 30,
                      color: "#fff"
                    }}>
                    关闭
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  date: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  mp10: {
    marginTop: 10,
    fontSize:18,
    marginRight:25
  },
  btn: {
    width: 80,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E96',
    padding: 5,
  },
  btn_text: {
    lineHeight: 30,
    textAlign: 'center',
    color: '#fff',
  },
  buttonStyle:{
    flexDirection: "row",
    justifyContent:"space-around",
    marginTop: 15
  }
});