import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cartItemReducer from '../reducer/cartItem.reducer';
import rootSaga from '../saga/saga';

const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(
  cartItemReducer,
  applyMiddleware(sagaMiddleWare)
);
sagaMiddleWare.run(rootSaga);
