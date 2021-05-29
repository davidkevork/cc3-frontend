import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AuthTabs from '../AuhTabs/AuthTabs';
import { environment } from '../../common/environment';
import './register.css';
import IndexNav from '../IndexNav/IndexNav';

class Register extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      id: '',
      username: '',
      password: '',
      image: '',
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await axios({
      method: 'POST',
      url: `${environment.host}/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      },
    });
    if (result.data.error) {
      alert(result.data.error);
    } else {
      window.location.href = '/login';
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
                    minLength: 5,
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
