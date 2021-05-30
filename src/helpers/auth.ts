import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import * as user from '../actions/user';
import { redirect } from './history';
import { getToken, ItokenObject } from './token';
import { Auth } from 'aws-amplify';

type authType = 'private' | 'public';

export async function publicAuth(
  dispatch: Dispatch,
  props: any,
  callback: (success: boolean) => void,
) {
  const data = await getToken();
  if (data.error === undefined) {
    if (props.userId === data.userId) {
      callback(true);
      redirect('/home');
    } else {
      await userAuth(dispatch, data, 'public', callback);
    }
  } else {
    await Auth.signOut();
    dispatch(user.resetUserToken());
    callback(false);
  }
}

export async function privateAuth(
  dispatch: Dispatch,
  props: any,
  callback: (success: boolean) => void,
) {
  const data = await getToken();
  if (data.error !== undefined) {
    await Auth.signOut();
    dispatch(user.resetUserToken());
    callback(false);
    redirect('/login');
  } else if (props.userId === data.userId) {
    callback(true);
  } else {
    await userAuth(dispatch, data, 'private', callback);
  }
}

export async function userAuth(
  dispatch: Dispatch,
  data: ItokenObject,
  type: authType,
  callback: (success: boolean) => void,
) {
  dispatch(
    user.userFromTokenSuccess({
      jwt: data.token,
      userId: data.userId,
      email: data.email,
    }),
  );
  callback(true);
  if (type === 'public') {
    redirect('/home');
  }
}

export async function logout(dispatch: Dispatch) {
  toast.info('Logging out');
  await Auth.signOut();
  dispatch(user.resetUserToken());
  redirect('/login');
}
