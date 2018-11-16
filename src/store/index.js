import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from './middleware/logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers/rootReducer';
import rootSaga from './../sagas'

const initialState = {
  simpleReducer: 'initialValue',
}

const sagaMiddleware = createSagaMiddleware()
export default function configureStore() {
  const middlewares = [loggerMiddleware, sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, initialState, composedEnhancers)

  sagaMiddleware.run(rootSaga)

  return store
}
