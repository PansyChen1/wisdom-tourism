import React, {Component} from "react";

import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,

} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import CreatePassage from "../page/CreatePassage";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationBar from "../common/NavigationBar";
import BackPressComponent from "../common/BackPressComponent";
import ViewUtil from "../util/ViewUtil";
import ImagePicker from "react-native-image-picker";

type Props = {};
const TITLE_COLOR = "#678";

export default class SharePage extends Component<Props>{
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      videoSource: null,
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

  //选择图片
  selectPhotoTapped() {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择照片',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  //选择视频
  selectVideoTapped() {
    const options = {

      title: '选择视频',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '录制视频',
      chooseFromLibraryButtonTitle: '选择视频',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

  render() {
    const {theme} = this.props;

    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: "light-content",
    };

    let navigationBar = <NavigationBar
      title={"游记"}
      statusBar={statusBar}
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      style={{backgroundColor: TITLE_COLOR}}
    />;

    return (
      <View style={styles.container}>
        {navigationBar}
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.goPage({theme}, 'CreatePassage')
          }}
        >
          <View>
            {
              this.state.avatarSource === null ?
              <Text style={styles.textStyle}>发布一篇游记</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
          </View>
        </TouchableOpacity>

        <View style={styles.buttonFlex}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 30}]}>
              { this.state.avatarSource === null ? <Text>选择照片</Text> :
                <Image style={styles.avatar} source={this.state.avatarSource} />
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer]}>
              <Text>选择视频</Text>
            </View>
          </TouchableOpacity>
        </View>

        { this.state.videoSource &&
        <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },
  avatarContainer: {
    borderColor: '#678',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 50,
    width: 120,
    height: 120
  },
  buttonFlex: {
    marginTop: 60,
    justifyContent:"space-around",
    alignItems: 'center',
    flexDirection: "row",
  },
  textStyle: {
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
