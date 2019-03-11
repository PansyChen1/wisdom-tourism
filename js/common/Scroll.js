import React, {Component} from "react";
import {Image, Dimensions} from "react-native";
import Swiper from 'react-native-swiper';

const width = Dimensions.get('window').width;
export default class Scroll extends Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        height={width * 40 /75}
        showsButtons={false}
        autoplay={true}
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      >
        <Image source={require('../images/1.png')} style={styles.bannerImg} />
        <Image source={require('../images/2.png')} style={styles.bannerImg} />
        <Image source={require('../images/3.png')} style={styles.bannerImg} />
        <Image source={require('../images/4.png')} style={styles.bannerImg} />
        <Image source={require('../images/5.png')} style={styles.bannerImg} />
        <Image source={require('../images/6.png')} style={styles.bannerImg} />
      </Swiper>
    )
  }
}

var styles = {
  bannerImg: {
    height: width * 40 /70,
    width: width,
  },
  wrapper: {
    width: width,
  },
  paginationStyle: {
    bottom: 6,
  },
  dotStyle: {
    width: 22,
    height: 3,
    backgroundColor: '#fff',
    opacity: 0.4,
    borderRadius: 0,
  },
  activeDotStyle: {
    width: 22,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 0,
  },
};