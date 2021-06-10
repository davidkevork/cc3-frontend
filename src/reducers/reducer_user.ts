import { Reducer } from 'redux';
import { UserActionTypes } from '../actions/user';

export interface IUserReducerState {
  readonly jwt: string | undefined;
  readonly userId: string | undefined;
  readonly email: string;
  readonly status: string;
  readonly error: Error | undefined;
  readonly loading: boolean;
}

export const INITIAL_STATE: IUserReducerState = {
  jwt: undefined,
  userId: undefined,
  email: '',
  status: '',
  error: undefined,
  loading: false,
};

export const UserReducer: Reducer<IUserReducerState> = (
  state = INITIAL_STATE,
  action,
) => {
  const {
    jwt, userId, email,
  }: {
    jwt: string;
    userId: string;
    email: string;
  } = (action.payload === undefined
    || action.payload === null
    || typeof action.payload !== 'object') ? {} : action.payload;

  switch (action.type) {
    case UserActionTypes.USER_FROM_TOKEN_SUCCESS:
      return {
        ...state,
        jwt,
        userId,
        email,
        status: 'AUTHENTICATED',
        error: undefined,
        loading: false,
      };
    case UserActionTypes.RESET_USER_TOKEN:
      return {
        ...state,
        jwt: undefined,
        userId: undefined,
        status: 'STORAGE',
        error: undefined,
        loading: false,
      };
    default:
      return state;
  }
};
