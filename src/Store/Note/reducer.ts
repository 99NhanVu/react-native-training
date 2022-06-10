// import { TodoActions, notestate } from "./types";

import {
  FETCH_NOTE_REQUEST,
  ACTION_NOTE_SUCCESS,
  ACTION_NOTE_FAILURE,
} from './actionTypes';

const initialState: any = {
  pending: false,
  notes: [],
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_NOTE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_NOTE_SUCCESS:
      return {
        ...state,
        pending: false,
        notes: action.payload.notes,
        error: null,
      };
    case ACTION_NOTE_FAILURE:
      return {
        ...state,
        pending: false,
        notes: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
