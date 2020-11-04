import { actionDefine, typeOf } from './index';
import _set from 'lodash/set';
import produce from 'immer';
import _get from 'lodash/get';

// 创建redux对象
export function createReducer(
    nameSpace,
    initValues,
    effects = {},
) {
  effects = Object.keys(effects);
  const setState = actionDefine(nameSpace, 'SET_STATE');
  const resetReact = actionDefine(nameSpace, 'RESET_STATE');
  return function(state = initValues, { type, payload }) {
    if (effects.includes(type)) return state;
    switch (type) {
      case setState:
        return produce(state, (newState) => {
          if (typeOf(payload) !== 'array') {
            payload = [payload];
          }
          payload.forEach(data => {
            const { path, value } = data;
            _set(newState, path, value);
          });
        });
      case resetReact:
      default:
        return initValues;
    }
  };
}

// redux中effects异步错误处理
export function reduxOnError(error, errorInfo) {
  console.error(error);
}

/**
 * 获取对应action的loading状态
 * @param {object} state
 * @param {string[]} actions 需要获取的action
 * @returns {boolean}
 */
export function getEffLoading(state = {}, actions = []) {
  return actions.some(action => {
    return _get(state, ['@@loading', action], action) === true;
  });
}