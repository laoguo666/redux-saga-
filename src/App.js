import './App.css';
import { connect } from 'react-redux';
import { nameSpace as NS, actions } from './store/reducers/global';
import { getEffLoading } from './util';

function App({ txt, obj, changeTxt, changeObj, loading }) {
  return (
      <div className="App">
        {txt}
        {JSON.stringify(obj)}
        <input type='text' onChange={event => changeTxt(event.target.value)}/>
        <button onClick={() => changeObj()}>123</button>
        {loading && '加载中'}
      </div>
  );
}

export default connect(state => {
      return {
        txt: state[NS].txt,
        obj: state[NS].obj,
        loading: getEffLoading(state[NS], [actions.SHISHI, actions.ASYNC_INCREMENT]),
      };
    },
    dispatch => {
      return {
        changeTxt: (value) => dispatch({ type: actions.SHISHI, payload: value }),
        changeObj: () => dispatch({ type: actions.ASYNC_INCREMENT, payload: { a: '我改变了' } }),
      };
    },
)(App);
