import 'whatwg-fetch';
import { action } from 'typesafe-actions';
import { API_URL } from '../constants/const';

export const UserActionTypes = {
  USER_FROM_TOKEN: 'USER_FROM_TOKEN',
  USER_FROM_TOKEN_SUCCESS: 'USER_FROM_TOKEN_SUCCESS',
  USER_FROM_TOKEN_FAILURE: 'USER_FROM_TOKEN_FAILURE',

  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',

  RESET_USER_TOKEN: 'RESET_USER_TOKEN',
  SET_USER_LOADING: 'SET_USER_LOADING',
  SET_USER_ERROR: 'SET_USER_ERROR',
  CLEAR_USER_ERROR: 'CLEAR_USER_ERROR',
}

/** User from token */
export const userFromToken = (
  tokenFromStorage: string,
  userId: string,
): any => action(UserActionTypes.USER_FROM_TOKEN, fetch(`${API_URL}users/${userId}`, {
  method: 'GET',
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenFromStorage}`,
  }),
}).then(response => response.json()));

export const userFromTokenFailure = (
  error: Error,
) => action(UserActionTypes.USER_FROM_TOKEN_FAILURE, error);

export const userFromTokenSuccess = (
  user: object,
) => action(UserActionTypes.USER_FROM_TOKEN_SUCCESS, user);

/** Logout */
export const logoutSuccess = () => action(UserActionTypes.LOGOUT_SUCCESS, null);

export const logoutFailure = (
  error: Error,
) => action(UserActionTypes.LOGOUT_FAILURE, error);

/** Common actions */
export const resetUserToken = (
) => action(UserActionTypes.RESET_USER_TOKEN);

export const setUserLoading = (
) => action(UserActionTypes.SET_USER_LOADING);

export const setUserError = (
  error: Error,
) => action(UserActionTypes.SET_USER_ERROR, error);

export const clearUserError = (
) => action(UserActionTypes.CLEAR_USER_ERROR);
