import {
  ADD_NOTE_REQUEST,
  UPDATE_NOTE_REQUEST,
  FETCH_NOTE_SUCCESS,
  FOCUS_NOTE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  ADD_NOTE_SUCCESS,
} from './actionTypes';

import {
  FETCH_NOTE_REQUEST,
  ACTION_NOTE_FAILURE,
  UPDATE_NOTE_SUCCESS,
} from './actionTypes';

const initialState: any = {
  pending: false,
  notes: [],
  currentNote: {},
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_NOTE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case FETCH_NOTE_REQUEST:
    case ADD_NOTE_REQUEST:
    case UPDATE_NOTE_REQUEST:
    case DELETE_NOTE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_NOTE_SUCCESS:
      return {
        ...state,
        pending: false,
        notes: action.payload.notes,
        error: null,
      };
    case UPDATE_NOTE_SUCCESS:
      const updatedNotes = state.notes.map((note: any) => {
        if (note.id === action.payload.currentNote.id) {
          return action.payload.currentNote;
        }
        return note;
      });
      return {
        ...state,
        pending: false,
        currentNote: action.payload.currentNote,
        notes: updatedNotes,
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        pending: false,
        notes: state.notes.filter((note: any) => note.id !== action.payload.id),
        currentNote: {},
      };
    case ADD_NOTE_SUCCESS:
      const newNotes = [...state.notes, action.payload];
      return {
        ...state,
        pending: false,
        notes: newNotes,
        currentNote: action.payload,
      };
    case FOCUS_NOTE:
      return {
        ...state,
        currentNote: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
