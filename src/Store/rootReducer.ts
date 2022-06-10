import {combineReducers} from 'redux';

import noteReducer from './Note/reducer';

const rootReducer = combineReducers({
  note: noteReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
