import Types from "./types";

/**
 * 处理下拉刷新时的数据
 * @params actionType
 * @params dispatch
 * @params storeName
 * @params data
 * @params pageSize
 * **/
export function handleData(actionType, dispatch, storeName, data, pageSize) {
  let fixItems = [];
  if(data && data.data) {
    if(Array.isArray(data.data)) {
      fixItems = data.data;
    }else if(Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  dispatch({
    type: actionType,
    items: fixItems,
    projectModels: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),//第一次要加载的数据
    pageIndex: 1,
    storeName
  })
}