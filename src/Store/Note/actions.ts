import {
  FETCH_NOTE_REQUEST,
  ADD_NOTE_REQUEST,
  ACTION_NOTE_SUCCESS,
  ACTION_NOTE_FAILURE,
} from './actionTypes';

export const fetchNoteRequest = (groupId: number): any => ({
  type: FETCH_NOTE_REQUEST,
  groupId,
});
export const actionNoteSuccess = (payload: any): any => ({
  type: ACTION_NOTE_SUCCESS,
  payload,
});
export const actionNoteFailure = (payload: any): any => ({
  type: ACTION_NOTE_FAILURE,
  payload,
});
export const addNoteRequest = (payload: any): any => ({
  type: ADD_NOTE_REQUEST,
  payload,
});
