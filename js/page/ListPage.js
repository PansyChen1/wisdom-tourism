import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";

type Props = {};
export default class ListPage extends Component<Props>{
  constructor(props) {
    super(props);
  }

  render() {
    const {theme} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.picPosition}>
          <View style={styles.textPosition}>
            <TouchableOpacity
              onPress={() => {
                NavigationUtil.goPage({theme}, 'AttractionPage')
              }}
            >
              <Image
                source={require("../images/1.png")}
                style={styles.picList}
              />
              <Text style={styles.text}>景点</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textPosition}>
            <TouchableOpacity
              onPress={() => {
                NavigationUtil.goPage({theme}, 'FoodPage')
              }}
            >
              <Image
                source={require("../images/2.png")}
                style={styles.picList}
              />
              <Text style={styles.text}>美食</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textPosition}>
            <TouchableOpacity
              onPress={() => {
                NavigationUtil.goPage({theme}, 'HousePage')
              }}
            >
              <Image
                source={require("../images/3.png")}
                style={styles.picList}
              />
              <Text style={styles.text}>民宿</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.picPosition}>
          <View style={styles.textPosition}>
            <TouchableOpacity
              onPress={() => {
                NavigationUtil.goPage({theme}, 'CustomPage')
              }}
            >
              <Image
                source={require("../images/4.png")}
                style={styles.picList}
              />
              <Text style={styles.text}>民俗</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textPosition}>
            <TouchableOpacity
              onPress={() => {
                NavigationUtil.goPage({theme}, 'CustomPage')
              }}
            >
              <Image
                source={require("../images/5.png")}
                style={styles.picList}
              />
              <Text style={styles.text}>旅游路线</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textPosition}>
            <TouchableOpacity
              onPress={() => {
                NavigationUtil.goPage({theme}, 'CreatePassage')
              }}
            >
              <Image
                source={require("../images/6.png")}
                style={styles.picList}
              />
              <Text style={styles.text}>个性定制</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex:1,
    marginTop:20,
  },
  picPosition: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom:10
  },
  picList: {
    height:75,
    width:75,
    borderRadius:50
  },
  text: {
    fontSize:18,
  },
  textPosition:{
    alignItems:"center",
  }
};