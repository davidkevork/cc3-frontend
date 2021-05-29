import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import intl from 'react-intl-universal';
import { hot } from 'react-hot-loader';
import { enUS } from '../../locales/en-US';
import { IUserBusinessReducerState } from '../../reducers/reducer_user_business';
import { ILoginReducerState } from '../../reducers/reducer_login';
import { errorType } from '../../../typings/common/actions';
import { emailSchema, passwordSchema } from '../../schemas/inputSchema';
import IndexNav from '../../IndexNav/IndexNav';
import AuthTabs from '../../AuhTabs/AuthTabs';
import './Login.scss';
import { bg_card_auth, bg_business_auth } from '../../constants/images';

const isUser = process.env.ROLE === 'user';

export interface ILoginComponentProps {
  handleChange: (type: string, value: string, error: errorType | undefined) => void;
  redirect: (to: string) => void;
  clearFields: () => void;
  loadProfile: (props: IUserBusinessReducerState) => void;
  submit: (email: string, password: string, callback: () => void) => any;
  userBusiness: IUserBusinessReducerState;
  login: ILoginReducerState;
}

class LoginComponent extends React.Component<ILoginComponentProps, {}> {
  constructor(props: ILoginComponentProps) {
    super(props);
  }
  public componentWillReceiveProps(nextProps: ILoginComponentProps) {
    if (nextProps.userBusiness.status === 'authenticated'
    && nextProps.userBusiness.userId
    && !nextProps.userBusiness.error) {
      this.props.redirect('/cards');
    }
  }
  public componentWillUnmount() {
    this.props.clearFields();
  }
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleChange(event.target.id, event.target.value, this.props.login.error);
  }
  private submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!this.props.userBusiness.loading) {
      this.props.submit(this.props.login.email, this.props.login.password, () => {
        this.props.loadProfile(this.props.userBusiness);
      });
    }
  }
  public render() {
    return (
      <Grid className="page page-login page-auth">
        <IndexNav />
        <Grid
          container={true}
          spacing={16}
          alignItems="center"
          className="page-content"
          direction="column"
        >
          <h2 className="title">
            {isUser ?
              intl.get('WELCOME_CARD').d(enUS.WELCOME_CARD)
              :
              intl.get('WELCOME_BUSINESS').d(enUS.WELCOME_BUSINESS)
            }
          </h2>
          {/* <h2 className="title text-center">{intl.get('LOGIN').d(enUS.LOGIN)}</h2> */}
          <Grid container={true} className="page-wrapper">
            <Grid item={true} className="page-image">
              <img src={isUser ? bg_card_auth : bg_business_auth} alt="Login Image"/>
            </Grid>
            <Grid item={true} className="page-form">
              <AuthTabs value="login" />
              <form method="post" onSubmit={this.submit}>
                <Grid container={true} className="form-inputs">
                  <TextField
                    id="email"
                    label={intl.get('EMAIL_ADDRESS').d(enUS.EMAIL_ADDRESS)}
                    margin="normal"
                    type="email"
                    fullWidth={true}
                    inputProps={emailSchema}
                    onChange={this.handleChange}
                    required={emailSchema.required}
                  />
                  <TextField
                    id="password"
                    label={intl.get('PASSWORD').d(enUS.PASSWORD)}
                    margin="normal"
                    type="password"
                    fullWidth={true}
                    inputProps={passwordSchema}
                    onChange={this.handleChange}
                    required={passwordSchema.required}
                  />
                </Grid>
                <Grid
                  container={true}
                  alignContent="center"
                  alignItems="center"
                  justify="space-between"
                  className="form-buttons"
                  spacing={16}
                >
                  <NavLink className="password-reset" to="/reset">
                    {intl.get('FORGOT_PASSWORD').d(enUS.FORGOT_PASSWORD)}
                  </NavLink>
                  <Button variant="contained" color="primary" type="submit">
                    {intl.get('LOGIN').d(enUS.LOGIN)}
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default hot(module)(LoginComponent);
