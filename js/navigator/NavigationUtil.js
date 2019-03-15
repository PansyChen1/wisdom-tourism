/**
 * 全局导航控制工具类
 * */

export default class NavigationUtil {
  /**
   * 跳转到指定页面
   * @param params:要传递的参数
   * @param page：要跳转的页面
   * */
  static goPage(params, page){
    const navigation = NavigationUtil.navigation;
    if(!navigation){
      console.log("NavigationUtil.navigation can not be null")
      return;
    }
    navigation.navigate(
      page,
      {
        ...params
      }

    )
  }
  /**
  * 返回上一页
   * @param navigation
  * */
  static goBack(navigation){
    navigation.goBack();
  }
  /**
   * 重置到首页
   * @param navigation
   * */
  static resetToLoginPage(params){
    const {navigation} = params;
    navigation.goBack();
    navigation.navigate("Login");
  }
  /**
   * 登录之后跳转到首页
   * @param navigation
   * */
  static resetToHomePage(params){
    const {navigation} = params;
    navigation.goBack();
    navigation.navigate("Main");
  }
  /**
   * 跳转到注册页面
   * @param navigation
   * */
  static resetToRegisterPage(params) {
    const {navigation} = params;
    navigation.goBack();
    navigation.navigate("Register");
  }

}