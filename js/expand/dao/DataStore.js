import {AsyncStorage} from "react-native";
import Trending from 'GitHubTrending';
export const FLAG_STORAGE = {
  flag_popular: {
    self: 'popular',
    other: {
      flag_attraction: 'attraction',
      flag_food: 'food',
      flag_specialty: 'specialty',
      flag_house: 'house',
      flag_custom: 'custom',
    }
  },
  flag_trending: 'trending',
};

export default class DataStore {
  /**
   * 保存数据
   * @param url
   * @param data
   * @param callback
   * **/
  savaData(url, data, callback) {
    if(!data || !url) return;
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)),callback);
  }

  /**
   * 获取本地数据
   * @param url
   * @returns {Promise}
   * **/
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(url, (error, result) => {
          if(!error) {
            try {
              //未发生错误时，进行解析
              resolve(JSON.parse(result));
            } catch (e) {
              reject(e);
              console.error(e);
            }
          }else {
            reject(error);
            console.error(error);
          }
        })
      }
    )
  }

  /**
   * 获取网络数据
   * @param url
   * @param flag
   * @returns {Promise}
   * **/
  fetchNetData(url, flag) {
    return new Promise((resolve, reject) => {

      if(flag !== FLAG_STORAGE) {
        fetch(url)
          .then((response) => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok');
          })
          .then((responseData) => {
            //将数据保存在本地
            this.savaData(url, responseData);
            resolve(responseData);
          })
          .catch((error) => {
            reject(error);
          })
      }else {
        new Trending().fetchTrending(url)
          .then(items => {
            if(!items) {
              throw new Error('responseData is null');
            }
            this.savaData(url, items);
            resolve(items);
          })
          .catch(error => {
            reject(error);
          })
      }
    })
  }

  /**
   * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
   * @params url
   * @params flag
   * **/
  fetchData(url, flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then((wrapData) => {
        if(wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
          resolve(wrapData);
        }else {
          this.fetchNetData(url, flag).then((data) => {
            resolve(this._wrapData(data));
          }).catch((error) => {
            reject(error);
          })
        }
      }).catch((error) => {
        this.fetchNetData(url, flag).then((data) => {
          resolve(this._wrapData(data));
        }).catch((error => {
          reject(error);
        }))
      })
    })
  }

  _wrapData(data) {
    return {data: data, timestamp: new Date().getTime()};
  }

  /**
   * 检查timestamp是否在有效期内
   * @param timestamp 项目更新时间
   * @return {boolean} true 不需要更新时间，false需要更新
   * **/
  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    currentDate.setTime(timestamp);
    if(currentDate.getMonth() !== targetDate.getMonth()) return false;
    if(currentDate.getHours() - targetDate.getHours() > 4) return false;
    if(currentDate.getDate() !== targetDate.getDate()) return false;

  }

}