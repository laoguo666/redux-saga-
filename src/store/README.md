# 此文件夹为redux相关配置
## 相关范例
`reducers/index.js`
```js
import { combineReducers } from 'redux';
// 导入相关模块数据
import global, { effects as glE } from './global';
// 整合reducers
export default combineReducers({
  global,
});
// 合并异步处理函数由redux-saga接管
export const effects = {
  ...glE,
};
```
`reducers/model.js`
```js
import createReducer from '../../util/createReducer';
import { actionDefine } from '../../util';
import { delay, put } from 'redux-saga/effects';

// 命名空间，不同模块需唯一
export const nameSpace = 'global';
// 整合actions，每个model中都需要一个’SET_STATE‘和’RESET_STATE’同步修改数据
export const actions = actionDefine(nameSpace, [
  'SET_STATE',
  'RESET_STATE',
  'ASYNC_INCREMENT',
  'SHISHI',
]);
// init state
const initValues = {
  txt: 'hello world',
  obj: { a: 1 },
};
// 这里做异步任务处理，必须为Generator函数,可以接受参数为派发action时所传递的参数
export const effects = {
  *[actions.ASYNC_INCREMENT](action) {
    // 模拟ajax请求
    yield delay(1000);
    // 通过SET_STATE修改数据
    yield put({
      type: actions.SET_STATE,
      // payload中必须有  path和value参数
      // payload: { path: ['txt'], value: '老郭' },
      // 也可以是一个数组同时修改多个
      payload: [
        { path: ['txt'], value: '老郭' },
        { path: ['obj','a'], value: 2 },
      ],
    });
  },
};
// 通过createReducer整合成为reducer对象
export default createReducer(nameSpace, initValues, effects);
```