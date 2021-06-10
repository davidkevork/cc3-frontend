import 'whatwg-fetch';
import { action } from 'typesafe-actions';

export const UserActionTypes = {
  USER_FROM_TOKEN_SUCCESS: 'USER_FROM_TOKEN_SUCCESS',

  RESET_USER_TOKEN: 'RESET_USER_TOKEN',
}

export const userFromTokenSuccess = (
  user: object,
) => action(UserActionTypes.USER_FROM_TOKEN_SUCCESS, user);

export const resetUserToken = (
) => action(UserActionTypes.RESET_USER_TOKEN);
