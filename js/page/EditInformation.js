import React, {Component} from 'react';
import {Dimensions, Text, View} from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import ViewUtil from "../util/ViewUtil";


const TITLE_COLOR = "#678";
const width = Dimensions.get('window').width;

const Props = {};
 export default class EditInformation extends Component {
   constructor(props) {
     super(props);
     this.state = {

     };
     this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
   }

   /**
    * 处理android中的物理返回键
    **/
   componentDidMount() {
     this.backPress.componentDidMount();
     // this._fetch();
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
     return (
       <View>
         {navigationBar}
         <Text>test</Text>
       </View>

     )
   }
 }