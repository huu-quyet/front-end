import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as type from '../action/actionTypes';
import axios from 'axios';

function* checkout(action: any): any {
  const postOrder = () => {
    return axios({
      method: 'POST',
      url: 'http://localhost:4000/api/checkout',
      data: {
        paySuccess: true,
        productsInOrder: action.payload,
      },
    });
  };
  try {
    const response = yield call(postOrder);
    yield put({ type: type.CLEAR_CART, success: response.data.success });
  } catch (error) {
    console.log(error);
  }
}

function* watcherSaga() {
  yield takeEvery(type.CHECKOUT, checkout);
}

export default function* rootSaga() {
  yield all([watcherSaga()]);
}
