/**
 * 全局导航控制工具类
 * */

export default class NavigationUtil {
  /**
  * 返回上一页
   * @param navigation
  * */
  static resetToHomePage(navigation){
    navigation.goBack();
  }
  /**
   * 重置到首页
   * @param navigation
   * */
  static resetToHomePage(params){
    const {navigation} = params;
    navigation.goBack();
    navigation.navigate.then("Main");
  }
}