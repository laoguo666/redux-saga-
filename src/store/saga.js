import { effects } from './reducers';
import { takeEvery, call, put } from 'redux-saga/effects';
import { actionDefine } from '../util';

function *loading(type, action) {
  const [name] = type.split('/');
  yield put({ type: actionDefine(name, 'SET_STATE'), payload: { path: ['@@loading', type], value: true } });
  yield call(effects[type], action);
  yield put({ type: actionDefine(name, 'SET_STATE'), payload: { path: ['@@loading', type], value: false } });
}

function *watchEvery(action) {
  const { type } = action;
  if (/\/(SET_STATE|RESET_STATE)$/.test(type)) return false;
  yield loading(type, action);
}

export function *rootSaga() {
  yield takeEvery('*', watchEvery);
}