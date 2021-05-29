import { combineReducers } from 'redux';
import { IUserReducerState, UserReducer } from './reducer_user';

export interface RootState {
  user: IUserReducerState;
}

const rootReducer = combineReducers({
  user: UserReducer,
});

export default rootReducer;
