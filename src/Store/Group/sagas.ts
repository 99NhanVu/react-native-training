import {put, all, takeLatest, call} from 'redux-saga/effects';
import {
  createGroupSuccess,
  deleteGroupSuccess,
  fetchGroupFailure,
  fetchGroupSuccess,
  updateGroupSuccess,
} from './actions';
import {
  FETCH_GROUP_REQUEST,
  CREATE_GROUP_REQUEST,
  DELETE_GROUP_REQUEST,
  UPDATE_GROUP_REQUEST,
} from './actionTypes';
import {createGroup, deleteGroup, getGroups, updateGroup} from './apis';

function* fetchGroupSaga(action: any) {
  try {
    const response = yield call(getGroups);
    yield put(fetchGroupSuccess(response.data));
  } catch (error) {
    yield put(fetchGroupFailure(error));
  }
}

function* createGroupSaga(action: any) {
  try {
    const response = yield call(createGroup, action.payload);
    if (response.status === 200) {
      yield put(createGroupSuccess(response.data));
    }
  } catch (error) {
    yield put(fetchGroupFailure(error));
  }
}

function* deleteGroupSaga(action: any) {
  try {
    const response = yield call(deleteGroup, action.payload);
    if (response.status === 200) {
      yield put(deleteGroupSuccess(action.payload));
    }
  } catch (error) {
    yield put(fetchGroupFailure(error));
  }
}

function* updateGroupSaga(action: any) {
  try {
    const response = yield call(updateGroup, action.payload);
    if (response.status === 200) {
      yield put(updateGroupSuccess(response.data));
    }
  } catch (error) {
    yield put(fetchGroupFailure(error));
  }
}

export default function* groupSaga() {
  yield all([
    takeLatest(FETCH_GROUP_REQUEST, fetchGroupSaga),
    takeLatest(CREATE_GROUP_REQUEST, createGroupSaga),
    takeLatest(DELETE_GROUP_REQUEST, deleteGroupSaga),
    takeLatest(UPDATE_GROUP_REQUEST, updateGroupSaga),
  ]);
}
