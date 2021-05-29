import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AuthTabs from '../AuhTabs/AuthTabs';
import IndexNav from '../IndexNav/IndexNav';
import { toast } from 'react-toastify';
import { Auth } from 'aws-amplify';
import './login.css';

class Login extends Component<
  any,
  { email: string; password: string; [key: string]: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const login = await Auth.signIn(this.state.email, this.state.password);
      console.log(login);
    } catch (error) {
      toast.error(`Login failed with error: ${error.message}`);
    }
  };
  render() {
    return (
      <Grid
        container={true}
        alignItems="center"
        alignContent="center"
        direction="column"
      >
        {/*
        // @ts-ignore */}
        <IndexNav />
        <h2>Login</h2>
        <Grid item={true}>
          <AuthTabs value="login" />
          <form method="post" onSubmit={this.login}>
            <Grid container={true} direction="column">
              <Grid item={true}>
                <TextField
                  id="email"
                  label="Email"
                  margin="normal"
                  type="email"
                  fullWidth={true}
                  onChange={this.handleChange}
                  required={true}
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  id="password"
                  label="Password"
                  margin="normal"
                  type="password"
                  fullWidth={true}
                  inputProps={{
                    maxLength: 100,
                    minLength: 5,
                  }}
                  onChange={this.handleChange}
                  required={true}
                />
              </Grid>
            </Grid>
            <Grid
              container={true}
              alignContent="center"
              alignItems="center"
              justify="space-between"
            >
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
