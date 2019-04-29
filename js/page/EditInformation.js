import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";
import AntDesign from "react-native-vector-icons/AntDesign";
import ImagePicker from "react-native-image-picker";


const TITLE_COLOR = "#E96";
const width = Dimensions.get('window').width;

const Props = {};
 export default class EditInformation extends Component {
   constructor(props) {
     super(props);
     this.state = {
       user: false,
     };
     this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
   }

   /**
    * 处理android中的物理返回键
    **/
   componentDidMount() {
     this.backPress.componentDidMount();
     // this._fetch();
     let that = this;

     AsyncStorage.getItem('user')
       .then((data) => {
         let user;
         if(data) {
           user = JSON.parse(data)
         }

         if(user && user.accessToken) {
           that.setState({
             user: user
           })
         }
       })
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

   selectPhotoTapped() {
     const options = {
       title: '选择头像',
       cancelButtonTitle: '取消',
       takePhotoButtonTitle: '拍照',
       chooseFromLibraryButtonTitle: '选择照片',
       cameraType: 'back',
       mediaType: 'photo',
       videoQuality: 'high',
       durationLimit: 10,
       maxWidth: 300,
       maxHeight: 300,
       quality: 0.8,//图片质量
       angle: 0,
       allowsEditing: true,
       noData: false,
       storageOptions: {
         skipBackup: true,
         path:'images'
       }
     };
     let that = this;

     ImagePicker.showImagePicker(options, (response) => {
       let avatarData = 'data:image/jpeg;base64,' + response.data;
       let user = that.state.user;

       user.avatar = avatarData;
       that.setState({
         user: user
       });
     });
   }

   render() {
     let statusBar = {
       backgroundColor: TITLE_COLOR,
       barStyle: "light-content",
     };

     let navigationBar = <NavigationBar
       title={"修改个人信息"}
       statusBar={statusBar}
       leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
       style={{backgroundColor: TITLE_COLOR}}
     />;

     let user = this.state.user;
     return (
       <View>
         {navigationBar}
         {
           !user.avatar
           ? <TouchableOpacity
               onPress={this.selectPhotoTapped.bind(this)}
             >
               <View style={styles.avatarBox}>
                 <Image
                   source={{uri: user.avatar}}
                   style={styles.avatar}
                 />
                 <Text style={styles.avatarTip}>点击这里换头像</Text>
               </View>
             </TouchableOpacity>
             :
             <View style={styles.avatarContainer}>
               <Text style={styles.avatarTip}>添加头像</Text>
               <TouchableOpacity
                 onPress={this.selectPhotoTapped.bind(this)}
                 style={styles.avatarBox}
               >
                 <AntDesign
                   name={'upload'}
                   style={styles.plusIcon}
                 />
               </TouchableOpacity>
             </View>
         }
       </View>

     )
   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30
  },
  avatarContainer: {
    width: width,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666'
  },
  avatarBox: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarTip: {
    color: '#000',
    backgroundColor: 'transparent',
    fontSize: 14
  },
  plusIcon: {
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    color: "#999",
    fontSize: 24,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  avatar: {
    marginBottom: 15,
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'cover',
    borderRadius: width * 0.1,
  }
});