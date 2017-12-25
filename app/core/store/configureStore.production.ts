import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const enhancer = applyMiddleware(thunk);

export = {
  configureStore(initialState: object | void) {
    return createStore(rootReducer, initialState, enhancer);
  },
};
