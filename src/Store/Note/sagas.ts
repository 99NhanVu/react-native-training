import {ADD_NOTE_REQUEST, FETCH_NOTE_REQUEST} from './actionTypes';
import {actionNoteSuccess, actionNoteFailure} from './actions';
import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

const getNotes = (groupId: number) =>
  axios.get(`${process.env.REACT_APP_API_URL}/group/${groupId}` as string);

function* fetchNoteSaga(action: any) {
  try {
    const response = yield call(getNotes, action.groupId);
    yield put(
      actionNoteSuccess({
        notes: response.data,
      }),
    );
  } catch (e: any) {
    yield put(
      actionNoteFailure({
        error: 'there some error in fetch note saga',
      }),
    );
  }
}

function* addNoteSaga(action: any) {
  try {
    yield call(
      axios.post(`${process.env.REACT_APP_API_URL}/notes/`, action.payload),
    );
    // yield* fetchNoteSaga({groupId: action.payload.groupId});
  } catch (e: any) {
    yield put(
      actionNoteFailure({
        error: 'there some error in add note saga',
      }),
    );
  }
}
function* noteSaga() {
  yield all([takeLatest(FETCH_NOTE_REQUEST, fetchNoteSaga)]);
  yield all([takeLatest(ADD_NOTE_REQUEST, addNoteSaga)]);
}

export default noteSaga;
