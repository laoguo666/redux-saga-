export * from './redux'

/**
 * actions重写
 * @param {string} nameSpace 命名空间
 * @param {string|string[]} actions
 * @returns {string|{}} 命名空间映射全局actions
 */
export function actionDefine(nameSpace, actions) {
  if (typeof actions === 'string') {
    return `${nameSpace.toUpperCase()}/${actions}`;
  }
  const obj = {};
  actions.forEach(data => {
    obj[data] = `${nameSpace.toUpperCase()}/${data}`;
  });
  return obj;
}

/**
 * 类型判断
 * @param {any} value
 * @returns {string}
 */
export function typeOf(value) {
  const type = Object.prototype.toString.call(value);
  return type.substring(8, type.length - 1).toLocaleUpperCase();
}