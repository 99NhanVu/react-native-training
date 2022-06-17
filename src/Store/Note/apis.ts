import axios from 'axios';

export const getNotes = (payload: any) =>
  axios.get(
    `${process.env.REACT_APP_API_URL}/group/${payload.groupId}?offset=${payload.offset}&limit=${payload.limit}`,
  );

export const addNote = (payload: any) =>
  axios.post(`${process.env.REACT_APP_API_URL}/notes/`, payload);

export const updateNote = (payload: any) =>
  axios.put(`${process.env.REACT_APP_API_URL}/notes/${payload.id}`, payload);

export const deleteNote = (payload: any) =>
  axios.delete(`${process.env.REACT_APP_API_URL}/note/delete/${payload.id}`);
