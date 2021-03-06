import Types from '../../action/types';

const defaultState = {};

/**
 * popular:{
 *   景点:{
 *     items:[],
 *     isLoading:false
 *   },
 *   美食:{
 *     items:[],
 *     isLoading:false
 *   }
 * }
 * @param state
 * @param action
 * @returns {{theme: (onAction|*|string)}}
 * **/

/**
 * 0 state树，横向扩展
 * 1 如何动态的设置store，和动态的获取store（难点：storekey不固定）
 * **/
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,//原始数据
          projectModels: action.projectModels,//此次要展示的数据
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        }
      };

    case Types.POPULAR_REFRESH://下拉刷新
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          isLoading: true,
        }
      };

    case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        }
      };

    case Types.POPULAR_LOAD_MORE_SUCCESS://上拉加载更多成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        }
      };

    case Types.POPULAR_LOAD_MORE_FAIL://上拉加载更多失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        }
      };
    default:
      return state;
  }
}