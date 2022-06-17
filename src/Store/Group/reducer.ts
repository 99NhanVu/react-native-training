import {
  FETCH_GROUP_REQUEST,
  FETCH_GROUP_SUCCESS,
  ACTION_GROUP_FAILURE,
  FOCUS_GROUP,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_REQUEST,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCESS,
  DELETE_GROUP_SUCCESS,
} from './actionTypes';

const initialState = {
  currentGroup: {},
  groups: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_GROUP_REQUEST:
    case CREATE_GROUP_REQUEST:
    case DELETE_GROUP_REQUEST:
    case UPDATE_GROUP_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GROUP_SUCCESS:
      return {
        ...state,
        pending: false,
        groups: action.payload,
      };
    case FOCUS_GROUP:
      return {
        ...state,
        currentGroup: action.payload,
      };
    case CREATE_GROUP_SUCCESS:
      const newGroups = [...state.groups, action.payload];
      return {
        ...state,
        pending: false,
        groups: newGroups,
      };
    case UPDATE_GROUP_SUCCESS:
      const updatedGroups = state.groups.map((group: any) => {
        if (group.id === action.payload.id) {
          return action.payload;
        }
        return group;
      });
      return {
        ...state,
        pending: false,
        groups: updatedGroups,
      };
    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        pending: false,
        groups: state.groups.filter(
          (group: any) => group.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};
