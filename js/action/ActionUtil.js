import Types from "./types";
import Utils from "../util/Util";
import ProjectModel from "../model/ProjectModel";

/**
 * 处理数据
 * @params actionType
 * @params dispatch
 * @params storeName
 * @params data
 * @params pageSize
 * @params favoriteDao
 * @params params 其他参数
 * **/
export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDao, params) {
  let fixItems = [];
  if(data && data.data) {
    if(Array.isArray(data.data)) {
      fixItems = data.data;
    }else if(Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }

  //第一次要加载的数据
  let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  _projectModels(showItems, favoriteDao, projectModels => {
    dispatch({
      type: actionType,
      items: fixItems,
      projectModels: projectModels,//第一次要加载的数据
      pageIndex: 1,
      storeName,
      ...params
    })
  });
}

/**
 * 通过本地的收藏状态包装Item
 * 通过async 和 await实现异步转同步
 * @param showItems
 * @param favoriteDao
 * @param callback
 * @returns {Promise<void>}
 * @private
 */
export async function _projectModels(showItems, favoriteDao, callback) {
  let keys = [];
  try {
    //获取收藏的key
    keys = await favoriteDao.getFavoriteKeys();
  } catch (e) {
    console.log(e);
  }
  let projectModels = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    projectModels.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)));
  }
  doCallBack(callback, projectModels);
}

export const doCallBack = (callBack, object) => {
  if (typeof callBack === 'function') {
    callBack(object);
  }
};