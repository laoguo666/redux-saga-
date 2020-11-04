import { actionDefine, createReducer } from '../../util';
import { delay, put } from 'redux-saga/effects';

export const nameSpace = 'global';
export const actions = actionDefine(nameSpace, [
  'SET_STATE',
  'RESET_STATE',
  'ASYNC_INCREMENT',
  'SHISHI',
]);

const initValues = {
  txt: 'hello world',
  obj: { a: 1 },
};

export const effects = {
  // 添加一个 ASYNC_INCREMENT 类型的 action
  *[actions.ASYNC_INCREMENT]({ payload }) {
    yield delay(1000);
    yield put({ type: actions.SET_STATE, payload: { path: ['obj'], value: payload } });
  },
  // 添加一个 ASYNC_INCREMENT 类型的 action
  *[actions.SHISHI]({ payload }) {
    yield delay(1000);
    yield put({
      type: actions.SET_STATE,
      payload: { path: ['txt'], value: payload },
    });
  },
};

export default createReducer(nameSpace, initValues, effects);
