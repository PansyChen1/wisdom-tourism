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
                source={require("../images/attraction.png")}
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
                source={require("../images/food.png")}
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
                source={require("../images/house.png")}
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
                source={require("../images/custom.png")}
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
                source={require("../images/route.png")}
                style={styles.picList}
              />
              <Text style={styles.text}>路线</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textPosition}>
            <TouchableOpacity
              onPress={() => {
                NavigationUtil.goPage({theme}, 'CreatePassage')
              }}
            >
              <Image
                source={require("../images/passage.png")}
                style={styles.picList}
              />
              <Text style={styles.text}>游记</Text>
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
    justifyContent: "space-between",
    marginBottom:10,
    marginLeft:40,
    marginRight:40
  },
  picList: {
    height:65,
    width:65,
  },
  text: {
    fontSize:18,
    marginTop:10,
    marginLeft:16
  },
  textPosition:{
    alignItems:"center",
  }
};