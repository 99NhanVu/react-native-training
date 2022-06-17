import axios from 'axios';

export const getGroups = () =>
  axios.get(`${process.env.REACT_APP_API_URL}/groups`);

export const createGroup = (group: any) =>
  axios.post(`${process.env.REACT_APP_API_URL}/groups/`, group);

export const deleteGroup = (group: any) =>
  axios.delete(`${process.env.REACT_APP_API_URL}/group/delete/${group.id}`);

export const updateGroup = (group: any) =>
  axios.put(`${process.env.REACT_APP_API_URL}/groups/${group.id}/`, group);
