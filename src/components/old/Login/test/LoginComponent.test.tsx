import * as React from 'react';
import * as enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise';
import LoginComponent from '../LoginComponent';
import { UserBusinessReducer } from '../../../reducers/reducer_user_business';
import { LoginReducer } from '../../../reducers/reducer_login';
import { errorType } from '../../../../typings/common/actions';

const mockStore = configureStore([promise]);

describe('Login Component', () => {
  it('should render correctly', () => {
    const store = mockStore({
      login: LoginReducer,
      userBusiness: UserBusinessReducer,
    });
    let LoginComponentRendered = enzyme.shallow(
      <LoginComponent
        handleChange={(type: string, value: string, error: errorType | undefined) => {}}
        redirect={(to: string) => {}}
        clearFields={() => {}}
        submit={(email: string, password: string) => {return true}}
        userBusiness={store.userBusiness}
        login={store.login}
      />
    );
    expect(toJson(LoginComponentRendered)).toMatchSnapshot();
  });