import {
  ADD_NOTE_REQUEST,
  DELETE_NOTE_REQUEST,
  FETCH_NOTE_REQUEST,
  UPDATE_NOTE_REQUEST,
} from './actionTypes';
import {
  fetchNoteSuccess,
  actionNoteFailure,
  updateNoteSuccess,
  deleteNoteSuccess,
  addNoteSuccess,
} from './actions';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {addNote, deleteNote, getNotes, updateNote} from './apis';

function* fetchNoteSaga(action: any) {
  try {
    const response = yield call(getNotes, action.payload);
    yield put(
      fetchNoteSuccess({
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
    const response = yield call(addNote, action.payload);
    if (response.status === 200) {
      yield put(addNoteSuccess(response.data));
    }
  } catch (e: any) {
    yield put(
      actionNoteFailure({
        error: 'add note saga' + e.message,
      }),
    );
  }
}

function* updateNoteSaga(action: any) {
  try {
    const response = yield call(updateNote, action.payload);
    if (response.status === 200)
      yield put(updateNoteSuccess({currentNote: response.data}));
  } catch (e: any) {
    yield put(
      actionNoteFailure({
        error: 'update note saga' + e.message,
      }),
    );
  }
}

function* deleteNoteSaga(action: any) {
  try {
    const response = yield call(deleteNote, action.payload);

    if (response.status === 200) {
      yield put(deleteNoteSuccess(action.payload));
    }
  } catch (e: any) {
    yield put(
      actionNoteFailure({
        error: 'delete note saga' + e.message,
      }),
    );
  }
}

function* noteSaga() {
  yield all([
    takeLatest(FETCH_NOTE_REQUEST, fetchNoteSaga),
    takeLatest(ADD_NOTE_REQUEST, addNoteSaga),
    takeLatest(UPDATE_NOTE_REQUEST, updateNoteSaga),
    takeLatest(DELETE_NOTE_REQUEST, deleteNoteSaga),
  ]);
}

export default noteSaga;
