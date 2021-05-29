import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import intl from 'react-intl-universal';
import Raven from 'raven-js';
import { Dispatch } from 'redux';
import { activate, activateSuccess, activateFailure } from '../../actions/userBusiness';
import ActivateComponent from './ActivateComponent';
import { getToken, setToken } from '../../helpers/token';
import { clearLocalStorage, logout } from '../../helpers/auth';
import { valueAction } from '../../../typings/common/actions';
import { AuthObject } from '../../../typings/common/reducers';
import { RootState } from '../../reducers';
import { enUS } from '../../locales/en-US';
import { errorAPI } from '../../helpers/errors';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  activate: (token: string) => {
    const splitData = token.split('-');
    const userId = splitData[0];
    const activation = splitData[1];
    if (userId === undefined || activation === undefined) {
      toast.error(intl.get('ACTIVATE.ACCOUNT_ACTIVATION_FAILED').d(
        enUS.ACTIVATE.ACCOUNT_ACTIVATION_FAILED,
      ));
      dispatch(activateFailure(intl.get('ACTIVATE.INVALID_TOKEN').d(
        enUS.ACTIVATE.INVALID_TOKEN,
      )));
    } else {
      dispatch(activate(userId, activation))
        .then((response: valueAction<AuthObject>) => {
          if (response.payload && response.payload.status === 201) {
            setToken(response.payload.token);
            const data = getToken(response.payload.token);
            dispatch(activateSuccess({ jwt: data.token, userId: data.userId, role: data.role }));
            toast.success(intl.get('ACTIVATE.ACCOUNT_ACTIVATED').d(
              enUS.ACTIVATE.ACCOUNT_ACTIVATED,
            ));
          } else if (response.payload.status === 401) {
            clearLocalStorage();
            logout(dispatch);
          } else if (response.payload.status === undefined) {
            const noInternet = intl.get('NO_INTERNET').d(enUS.NO_INTERNET);
            toast.error(noInternet);
            dispatch(activateFailure(noInternet));
          } else if (response.payload.error !== undefined) {
            toast.error(errorAPI(response.payload.error));
            dispatch(activateFailure(response.payload.error.message));
          }
        }).catch((e: any) => {
          Raven.captureException(e);
        });
    }
  },
});

const mapStateToProps = (state: RootState) => ({
  userBusiness: state.userBusiness,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateComponent);
