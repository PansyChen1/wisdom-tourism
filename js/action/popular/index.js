import Types from '../types';
import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
import {_projectModels, handleData} from '../ActionUtil';

/**
 * 获取最热异步数据的action
 * @param storeName 获取tab上的哪一个：景点，美食...
 * @param url
 * @param pageSize
 * @param favoriteDao
 * @returns {function(*=)}
 * **/
export function onRefreshPopular(storeName, url, pageSize, favoriteDao) {
  return dispatch => {
    dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore.fetchData(url, FLAG_STORAGE.flag_popular) //异步action与数据流
      .then(data => {
        handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao);
      })
      .catch(error => {
        console.log(error);
        dispatch({type: Types.POPULAR_REFRESH_FAIL, storeName, error});
      });

  }
}

/**
 * 加载更多
 * @param storeName 获取tab上的哪一个：景点，美食...
 * @param pageIndex 第几页
 * @param pageSize  每页展示的条数
 * @param dataArray 原始数据
 * @param callBack  回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @param favoriteDao
 * **/

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
  return dispatch => {
    //模拟网络请求
    setTimeout(() => {
      if((pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据
        if(typeof callBack === 'function') {
          callBack("no more");
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: "no more",
          storeName: storeName,
          pageIndex: --pageIndex,
        })
      }else {
        //本次和载入的最大数量
        let max = pageIndex * pageSize > dataArray.length ? dataArray.length : pageIndex * pageSize;
        _projectModels(dataArray.slice(0, max), favoriteDao, data => {
          dispatch({
            type: Types.POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels: data,
          })
        })
      }
    },500);
  }
}

