import {all, fork} from 'redux-saga/effects';

import noteSaga from './Note/sagas';

export function* rootSaga() {
  yield all([fork(noteSaga)]);
}
