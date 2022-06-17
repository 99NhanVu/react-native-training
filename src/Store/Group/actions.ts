import {
  ACTION_GROUP_FAILURE,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  FETCH_GROUP_REQUEST,
  FETCH_GROUP_SUCCESS,
  FOCUS_GROUP,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCESS,
} from './actionTypes';

export const fetchGroupFailure = (error: any) => ({
  type: ACTION_GROUP_FAILURE,
  payload: error,
});

export const fetchGroupRequest = () => ({
  type: FETCH_GROUP_REQUEST,
});

export const fetchGroupSuccess = (groups: any) => ({
  type: FETCH_GROUP_SUCCESS,
  payload: groups,
});

export const focusGroup = (group: any) => ({
  type: FOCUS_GROUP,
  payload: group,
});

export const createGroupRequest = (group: any) => ({
  type: CREATE_GROUP_REQUEST,
  payload: group,
});

export const createGroupSuccess = (group: any) => ({
  type: CREATE_GROUP_SUCCESS,
  payload: group,
});

export const updateGroupRequest = (group: any) => ({
  type: UPDATE_GROUP_REQUEST,
  payload: group,
});

export const updateGroupSuccess = (group: any) => ({
  type: UPDATE_GROUP_SUCCESS,
  payload: group,
});

export const deleteGroupRequest = (group: any) => ({
  type: DELETE_GROUP_REQUEST,
  payload: group,
});

export const deleteGroupSuccess = (group: any) => ({
  type: DELETE_GROUP_SUCCESS,
  payload: group,
});
