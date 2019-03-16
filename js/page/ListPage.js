import React, {Component} from "react";
import {View, Text, Image} from "react-native";

export default class ListPage extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.picPosition}>
          <View style={styles.textPosition}>
            <Image
              source={require("../images/1.png")}
              style={styles.picList}
            />
            <Text style={styles.text}>景点</Text>
          </View>

          <View style={styles.textPosition}>
            <Image
              source={require("../images/2.png")}
              style={styles.picList}
            />
            <Text style={styles.text}>美食</Text>
          </View>

          <View style={styles.textPosition}>
            <Image
              source={require("../images/3.png")}
              style={styles.picList}
            />
            <Text style={styles.text}>民宿</Text>
          </View>
        </View>

        <View style={styles.picPosition}>
          <View style={styles.textPosition}>
            <Image
              source={require("../images/4.png")}
              style={styles.picList}
            />
            <Text style={styles.text}>民俗</Text>
          </View>

          <View style={styles.textPosition}>
            <Image
              source={require("../images/5.png")}
              style={styles.picList}
            />
            <Text style={styles.text}>旅游路线</Text>
          </View>

          <View style={styles.textPosition}>
            <Image
              source={require("../images/6.png")}
              style={styles.picList}
            />
            <Text style={styles.text}>个性定制</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex:1,
    marginTop:-50
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