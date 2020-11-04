import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';
import {reduxOnError} from '../util'

const sagaMiddleware = createSagaMiddleware({
  onError:reduxOnError,
  effectMiddlewares: [],
});
let store = () => createStore(reducer, applyMiddleware(sagaMiddleware));
export default process.env.NODE_ENV === 'production' ?
    (store()) :
    (
        window.__REDUX_DEVTOOLS_EXTENSION__
            ?
            (createStore(reducer, compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__()))) :
            (store())
    );
sagaMiddleware.run(rootSaga);
