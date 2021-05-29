import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import IndexNav from '../IndexNav/IndexNav';
import './register.css';
import AuthTabs from '../AuhTabs/AuthTabs';

interface IRegisterState {
  email: string;
  password: string;
  confirm: string;
  [key: string]: string
}
class Register extends Component<any, IRegisterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.password !== this.state.confirm) {
      return toast.error('Password does not match confirm password');
    }
    try {
      await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          email: this.state.email,
        }
      });
      toast.success('Register successful');
    } catch (error) {
      toast.error(`Register failed with error: ${error.message}`);
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
        <h2>Register</h2>
        <Grid item={true}>
          <AuthTabs value="register" />
          <form method="post" onSubmit={this.register}>
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
                    minLength: 8,
                  }}
                  onChange={this.handleChange}
                  required={true}
                />
              </Grid>
              <Grid item={true}>
                <TextField
                  id="confirm"
                  label="Confirm Password"
                  margin="normal"
                  type="password"
                  fullWidth={true}
                  inputProps={{
                    maxLength: 100,
                    minLength: 8,
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
                Register
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Register;
