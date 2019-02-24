import Types from "./types";
import Utils from "../util/Util";
import ProjectModel from "../model/ProjectModel";

/**
 * 处理下拉刷新时的数据
 * @params actionType
 * @params dispatch
 * @params storeName
 * @params data
 * @params pageSize
 * @params favoriteDao
 * **/
export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDao) {
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
      storeName
    })
  });
}

/**
 * 通过本地的收藏状态包装Item
 * 异步转同步
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
  if (typeof callback === 'function') {
    callback(projectModels);
  }
}