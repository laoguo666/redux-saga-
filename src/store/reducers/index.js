import { combineReducers } from 'redux';

import global, { effects as glE } from './global';

export default combineReducers({
  global,
});
export const effects = {
  ...glE,
};