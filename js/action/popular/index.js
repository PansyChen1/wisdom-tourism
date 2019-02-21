import Types from '../types';
import DataStore from "../../expand/dao/DataStore";

/**
 * 获取最热异步数据的action
 * @param storeName 获取tab上的哪一个：景点，美食...
 * @param url
 * @param pageSize
 * @returns {function(*=)}
 * **/
export function onRefreshPopular(storeName, url, pageSize) {
  return dispatch => {
    dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore.fetchData(url) //异步action与数据流
      .then(data => {
        handleData(dispatch, storeName, data, pageSize);
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
 * **/

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
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
          projectModes: dataArray
        })
      }else {
        //本次和载入的最大数量
        let max = pageIndex * pageSize > dataArray.length ? dataArray.length : pageIndex * pageSize;
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        })
      }
    },500);
  }
}

/**
 * 处理下拉刷新时的数据
 * @params dispatch
 * @params storeName
 * @params data
 * @params pageSize
 * **/
function handleData(dispatch, storeName, data, pageSize) {
  let fixItems = [];
  if(data && data.data && data.data.items) {
    fixItems = data.data.items;
  }
  dispatch({
    type: Types.POPULAR_REFRESH_SUCCESS,
    items: fixItems,
    projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),//第一次要加载的数据
    pageIndex: 1,
    storeName
  })
}