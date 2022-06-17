import {all, fork} from 'redux-saga/effects';
import groupSaga from './Group/sagas';
import noteSaga from './Note/sagas';

export function* rootSaga() {
  yield all([fork(noteSaga), fork(groupSaga)]);
}
