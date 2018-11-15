import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/logger';

import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from '../reducers/rootReducer';

const initialState = {
  simpleReducer: 'initialValue',
};

export default function configureStore() {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  return createStore(
    rootReducer,
    initialState,
    composedEnhancers,
  );
}
