import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import intl from 'react-intl-universal';
import { hot } from 'react-hot-loader';
import Raven from 'raven-js';
import { Dispatch } from 'redux';
import HomeNavComponent from './HomeNavComponent';
import * as exchange from '../../helpers/exchange';
import {
  getExchangeRates, getExchangeRatesSuccess, getExchangeRatesFailure,
} from '../../actions/exchange';
import {
  logout, clearLocalStorage,
} from '../../helpers/auth';
import { RootState } from '../../reducers';
import { valueAction } from '../../../typings/common/actions';
import { CurrencyObject } from '../../../typings/common/reducers';
import { enUS } from '../../locales/en-US';
import { loadBusinessProfile } from '../../helpers/loadProfile';
import { IUserBusinessReducerState } from '../../reducers/reducer_user_business';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    logout(dispatch);
  },
  loadBusinessProfile: (props: IUserBusinessReducerState) => {
    loadBusinessProfile(dispatch, props, true);
  },
  getDefaultCurrency: () => {
    try {
      const currency = localStorage.getItem('currency');
      return currency === null ? 'USD' : currency;
    } catch (e) {
      Raven.captureException(e);
      return '';
    }
  },
  updateRates: (exchangeName: string) => {
    dispatch(getExchangeRates(exchangeName))
      .then((response: valueAction<CurrencyObject>) => {
        if (response.payload.items !== undefined && response.payload.status === 200) {
          dispatch(getExchangeRatesSuccess(response.payload.items[0]));
          exchange.storeRates(response.payload.items[0]);
        } else if (response.payload.status === 401) {
          clearLocalStorage();
          logout(dispatch);
        } else if (response.payload.status === undefined) {
          const noInternet = intl.get('NO_INTERNET').d(enUS.NO_INTERNET);
          toast.error(noInternet);
          dispatch(getExchangeRatesFailure(noInternet));
        } else if (response.payload.error !== undefined) {
          dispatch(getExchangeRatesFailure(response.payload.error.message));
        }
      }).catch((e: any) => {
        Raven.captureException(e);
      });
  },
});

const mapStateToProps = (state: RootState) => ({
  userBusiness: state.userBusiness,
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(HomeNavComponent));
