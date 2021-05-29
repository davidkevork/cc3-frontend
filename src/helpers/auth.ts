import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import * as user from '../actions/user';
import { redirect } from './history';
import { getToken, removeToken, ItokenObject } from './token';
import { valueAction } from '../typings/actions';
import {
  UserObject,
} from '../typings/reducer';

type authType = 'private' | 'public';

export function publicAuth(
  dispatch: Dispatch,
  props: any,
  callback: (success: boolean) => void,
) {
  const data = getToken();
  if (data.error === undefined) {
    if (props.jwt === data.token && props.userId === data.userId) {
      callback(true);
      redirect('/home');
    } else {
      userAuth(dispatch, data, 'public', callback);
    }
  } else {
    removeToken();
    clearLocalStorage();
    dispatch(user.resetUserToken());
    callback(false);
  }
}

export function privateAuth(
  dispatch: Dispatch,
  props: any,
  callback: (success: boolean) => void,
) {
  const data = getToken();
  if (data.error !== undefined) {
    removeToken();
    clearLocalStorage();
    dispatch(user.resetUserToken());
    callback(false);
    redirect('/login');
  } else if (
    props.jwt === data.token &&
    props.userId === data.userId
  ) {
    callback(true);
  } else {
    userAuth(dispatch, data, 'private', callback);
  }
}

export function userAuth(
  dispatch: Dispatch,
  data: ItokenObject,
  type: authType,
  callback: (success: boolean) => void,
) {
  dispatch(user.setUserLoading());
  dispatch(user.userFromToken(data.token, data.userId))
    .then((response: valueAction<UserObject>) => {
      if (
        response.payload.items !== undefined &&
        response.payload.status === 200
      ) {
        const parseData = response.payload.items[0];
        dispatch(
          user.userFromTokenSuccess({
            jwt: data.token,
            userId: data.userId,
            email: parseData.email,
          }),
        );
        callback(true);
        if (type === 'public') {
          redirect('/home');
        }
      } else if (response.payload.status === 401) {
        clearLocalStorage();
        dispatch(user.logoutSuccess());
        callback(false);
        if (type === 'private') {
          redirect('/login');
        }
      } else if (response.payload.error !== undefined) {
        removeToken();
        clearLocalStorage();
        dispatch(
          user.userFromTokenFailure(response.payload.error.message),
        );
        callback(false);
        if (type === 'private') {
          redirect('/login');
        }
      } else {
        callback(false);
      }
    })
    .catch((e: Error) => {
      callback(false);
    });
}

export function logout(dispatch: Dispatch) {
  toast.info('Logging out');
  removeToken();
  clearLocalStorage();
  dispatch(user.resetUserToken());
  redirect('/login');
}

export function clearLocalStorage() {
  localStorage.removeItem('jwtToken');
}
