import Types from '../../action/types';

const defaultState = {};

/**
 * favorite:{
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
    case Types.FAVORITE_LOAD_DATA://获取数据
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
        }
      };

    case Types.FAVORITE_LOAD_SUCCESS://下拉获取成功的时候
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,//此次要展示的数据
          isLoading: false,
        }
      };

    case Types.FAVORITE_LOAD_FAIL://下拉获取失败的时候
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        }
      };

    default:
      return state;
  }
}