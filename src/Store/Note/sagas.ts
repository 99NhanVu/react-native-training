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
import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

const getNotes = (groupId: number) =>
  axios.get(`${process.env.REACT_APP_API_URL}/group/${groupId}` as string);

function* fetchNoteSaga(action: any) {
  try {
    const response = yield call(getNotes, action.groupId);
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

const addNote = (payload: any) =>
  axios.post(`${process.env.REACT_APP_API_URL}/notes/`, payload);

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

const updateNote = (payload: any) =>
  axios.put(`${process.env.REACT_APP_API_URL}/notes/${payload.id}`, payload);

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

const deleteNote = (payload: any) =>
  axios.delete(`${process.env.REACT_APP_API_URL}/note/delete/${payload.id}`);

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
