import {
  FETCH_NOTE_REQUEST,
  ADD_NOTE_REQUEST,
  FETCH_NOTE_SUCCESS,
  ACTION_NOTE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  FOCUS_NOTE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  ADD_NOTE_SUCCESS,
} from './actionTypes';

export const fetchNoteRequest = (payload: any): any => ({
  type: FETCH_NOTE_REQUEST,
  payload,
});
export const fetchNoteSuccess = (payload: any): any => ({
  type: FETCH_NOTE_SUCCESS,
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
export const addNoteSuccess = (payload: any): any => ({
  type: ADD_NOTE_SUCCESS,
  payload,
});
export const updateNoteRequest = (payload: any): any => ({
  type: UPDATE_NOTE_REQUEST,
  payload,
});
export const updateNoteSuccess = (payload: any): any => ({
  type: UPDATE_NOTE_SUCCESS,
  payload,
});
export const focusNote = (payload: any): any => ({
  type: FOCUS_NOTE,
  payload,
});
export const deleteNoteRequest = (payload: any): any => ({
  type: DELETE_NOTE_REQUEST,
  payload,
});
export const deleteNoteSuccess = (payload: any): any => ({
  type: DELETE_NOTE_SUCCESS,
  payload,
});
