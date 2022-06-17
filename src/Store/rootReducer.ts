import {combineReducers} from 'redux';

import noteReducer from './Note/reducer';
import groupReducer from './Group/reducer';
const rootReducer = combineReducers({
  note: noteReducer,
  group: groupReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
