import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AuthTabs from '../AuhTabs/AuthTabs';
import { environment } from '../../common/environment';
import './login.css';
import IndexNav from '../IndexNav/IndexNav';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  login = async (event) => {
    event.preventDefault();
    const result = await axios({
      method: 'POST',
      url: `${environment.host}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    });
    if (result.data.error) {
      alert(result.data.error);
    } else {
      localStorage.setItem('token', result.data.user.token);
      window.location = '/home';
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
