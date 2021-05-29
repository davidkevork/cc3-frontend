import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import intl from 'react-intl-universal';
import { hot } from 'react-hot-loader';
import { enUS } from '../../locales/en-US';
import {
  login,
  loginSuccess,
  loginFailure,
  setUserBusinessLoading,
} from '../../actions/userBusiness';
import {
  setLoginEmail,
  setLoginPassword,
  setLoginError,
  clearLoginError,
  clearLoginFields,
} from '../../actions/login';
import LoginComponent from './LoginComponent';
import { redirect } from '../../helpers/history';
import { getToken, setToken } from '../../helpers/token';
import { errorType, valueAction } from '../../../typings/common/actions';
import { AuthObject } from '../../../typings/common/reducers';
import { RootState } from '../../reducers';
import { masterValidator } from '../../helpers/validator';
import { loadUserProfile, loadBusinessProfile } from '../../helpers/loadProfile';
import { IUserBusinessReducerState } from '../../reducers/reducer_user_business';
import { errorAPI } from '../../helpers/errors';
import { linkCardFunc } from '../../../card/components/LinkCard/linkCardFunc';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleChange: (type: string, value: string, error: errorType | undefined) => {
    if (error !== undefined) {
      dispatch(clearLoginError());
    }
    switch (type) {
      case 'email':
        dispatch(setLoginEmail(value));
        break;
      case 'password':
        dispatch(setLoginPassword(value));
        break;
      default:
        break;
    }
  },
  redirect: (to: string) => {
    redirect(to);
  },
  clearFields: () => {
    dispatch(clearLoginFields());
  },
  loadProfile: (props: IUserBusinessReducerState): void => {
    loadUserProfile(dispatch, props);
    loadBusinessProfile(dispatch, props);
  },
  submit: (email: string, password: string, callback: () => void) => {
    dispatch(clearLoginError());
    const validator = masterValidator({
      email,
      password,
    });
    if (validator.isError) {
      dispatch(setLoginError(validator.error || ''));
    } else {
      dispatch(setUserBusinessLoading());
      const toastId = toast.info(intl.get('LOGGING_IN').d(enUS.LOGGING_IN));
      const role = process.env.ROLE === 'user' ? 'user' : 'business';
      return dispatch(login({ email, password, role }))
        .then((response: valueAction<AuthObject>) => {
          if (response.payload && response.payload.status === 201) {
            setToken(response.payload.token);
            const data = getToken(response.payload.token);
            dispatch(loginSuccess({ jwt: data.token, userId: data.userId, role: data.role }));
            callback();
            if (role === 'user') {
              const linkStorage = localStorage.getItem('link');
              const link: { [key: string]: string } = linkStorage === null ? {} : JSON.parse(linkStorage);
              localStorage.removeItem('link');
              Object.keys(link).forEach((element) => {
                const card = link[element].split(':');
                linkCardFunc(card[0], card[1], dispatch, false);
              });
            }
            redirect(role === 'user' ? '/cards' : '/locations');
          } else if (response.payload.status === undefined) {
            toast.dismiss(toastId);
            toast.error(intl.get('NO_INTERNET').d(enUS.NO_INTERNET));
            dispatch(loginFailure(intl.get('NO_INTERNET').d(enUS.NO_INTERNET)));
          } else if (response.payload.error !== undefined) {
            toast.dismiss(toastId);
            toast.error(errorAPI(response.payload.error));
            dispatch(loginFailure(response.payload.error.message));
          }
        });
    }
  },
});

const mapStateToProps = (state: RootState) => ({
  login: state.login,
  userBusiness: state.userBusiness,
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
