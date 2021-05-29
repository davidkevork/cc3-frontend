import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

import RequireAuth from './components/RequireAuth/RequireAuth';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Page404 from './components/Page404/Page404';
import AppWrapper from './components/AppWrapper/AppWrapper';
import { configureStore } from './store/configureStore';

Amplify.configure({
  Auth: {
    region: 'ap-southeast-2',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    userPoolId: 'ap-southeast-2_mWwitCMAM',
    userPoolWebClientId: '3dit6n3io4hel1aabo5d609po7',
  },
});

const store = configureStore();

const LoginRoute = (props: any) => (
  <RequireAuth type="public">
    <Login {...props} />
  </RequireAuth>
);
const RegisterRoute = (props: any) => (
  <RequireAuth type="public">
    <Register {...props} />
  </RequireAuth>
);
const HomeRoute = (props: any) => (
  <RequireAuth type="private">
    <Register {...props} />
  </RequireAuth>
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppWrapper>
        <Switch>
          <Route exact={true} path="/login" component={LoginRoute} />
          <Route exact={true} path="/register" component={RegisterRoute} />
          <Route exact={true} path="/home" component={HomeRoute} />
          <Route exact={true} path="/logout" component={Logout} />
          <Route component={Page404} />
        </Switch>
      </AppWrapper>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
