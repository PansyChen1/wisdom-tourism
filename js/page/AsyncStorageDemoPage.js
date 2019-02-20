import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";

type Props = {};
const KEY = "save_key";
export default class FetchDemoPage extends Component<Props> {
  constructor(props){
    super(props);
    this.state({
      showText: '',
    })
  }
  loadData() {
    //https://api.github.com/search/repositories?q=java
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
    fetch(url)
    //将response转化为string
      .then(response => response.text())
      .then(responseText => {
        this.setState({
          showText: responseText,
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AsyncStorage 使用</Text>

        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />

        <View style={styles.input_container}>
          <Text onPress={() => {
            this.doSave()
          }}>存储</Text>

          <Text onPress={() => {
            this.doMove()
          }}>删除</Text>

          <Text onPress={() => {
            this.getDate()
          }}>获取</Text>
        </View>
        <Text>
          {this.state.showText}
        </Text>
      </View>
    );
  }
  doSave() {
    //用法1
    AsyncStorage.setItem(KEY, this.value, error => {
      error && console.log(error.toString());
    })

    // //用法2
    // AsyncStorage.setItem(KEY, this.value)
    //   .catch(error => {
    //     error && console.log(error.toString());
    //   })
    //
    // //用法3
    // try {
    //   await AsyncStorage.setItem(KEY, this.value);
    // }catch (error) {
    //   error && console.log(error.toString());
    // }
  }

  doMove() {
    AsyncStorage.removeItem(KEY, this.value, error => {
      error && console.log(error.toString());
    })
  }

  getDate() {
    AsyncStorage.getItem(KEY, this.value, error => {
      error && console.log(error.toString());
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around"
  }
});

