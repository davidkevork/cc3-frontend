import * as React from 'react';
import * as enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise';
import ActivateComponent from '../ActivateComponent';
import { UserBusinessReducer } from '../../../reducers/reducer_user_business';
import { UserBusinessActionTypes } from '../../../actions/userBusiness';
import * as history from '../../../helpers/history';

const mockStore = configureStore([promise]);

describe('Activate Component', () => {
  it('should render correctly', () => {
    const store = mockStore({ userBusiness: UserBusinessReducer });
    let ActivateComponentRendered = enzyme.shallow(
      <ActivateComponent
        activate={() => {}}
        match={{
          params: {
            token: undefined,
          }
        }}
        userBusiness={store.userBusiness}
      />
    );
    expect(toJson(ActivateComponentRendered)).toMatchSnapshot();
  });
  it('should activate user/business', () => {
    const activateMock = jest.fn();
    const store = mockStore({ userBusiness: UserBusinessReducer });
    let userBusiness = store.userBusiness;
    let ActivateComponentUserBusiness = enzyme.shallow(
      <ActivateComponent
        activate={activateMock}
        match={{
          params: {
            token: 'random-id',
          }
        }}
        userBusiness={userBusiness}
      />
    );
    expect(toJson(ActivateComponentUserBusiness)).toMatchSnapshot();
    expect(activateMock).toBeCalledWith('random-id');
  });
  it('should receive props', async () => {
    const store = mockStore({ userBusiness: UserBusinessReducer });
    let ActivateComponentReceiveProps = enzyme.shallow(
      <ActivateComponent
        activate={() => {}}
        match={{
          params: {
            token: undefined,
          }
        }}
        userBusiness={store.userBusiness}
      />
    );

    await ActivateComponentReceiveProps.instance().componentWillReceiveProps({
      userBusiness: { status: UserBusinessActionTypes.ACTIVATE_FAILURE, error: 'random error' },
    }, ActivateComponentReceiveProps.state());
    expect(ActivateComponentReceiveProps.state('__html')).toStrictEqual('random error');

    let redirectSpy = jest.spyOn(history, 'redirect');
    
    await ActivateComponentReceiveProps.instance().componentWillReceiveProps({
      userBusiness: { status: UserBusinessActionTypes.ACTIVATE_SUCCESS },
    }, ActivateComponentReceiveProps.state());
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    
    redirectSpy.mockReset();
    redirectSpy.mockRestore();
  });
});