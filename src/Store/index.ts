import {createSlice, configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {id: 0, username: ''},
  },
  reducers: {
    loginAction: (state, {payload}) => {
      state.value.id = payload.id;
      state.value.username = payload.username;
    },
  },
});

const {loginAction} = authSlice.actions;

const store = configureStore({
  reducer: authSlice.reducer,
});

export {loginAction, store};
