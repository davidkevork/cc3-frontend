/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import axios from 'axios';

import { environment } from '../../common/environment';

class Home extends Component<Record<any, any>, Record<string, any>> {
  constructor(props: Record<any, any>) {
    super(props);
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    this.state = {
      email: '',
      username: '',
      subscriptions: [],
    };
  }
  async componentDidMount() {
    await this.fetchUser();
    await this.fetchSubscriptions();
  }
  async fetchUser() {
    const token = localStorage.getItem('token');
    const result = await axios({
      method: 'GET',
      url: `${environment.host}/user`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    this.setState({
      email: result.data.user.email,
      username: result.data.user.username,
    });
  }
  async fetchSubscriptions() {
    const token = localStorage.getItem('token');
    const result = await axios({
      method: 'GET',
      url: `${environment.host}/user/subscription`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    this.setState({
      subscriptions: result.data.subscription,
    });
  }
  showSubscriptions() {
    return this.state.subscriptions.map(
      (subscription: Record<string, string>) => (
        <div className="col" key={subscription.id}>
          <div className="card" style={{ width: '18rem' }}>
            <img
              src={subscription.img_url}
              className="card-img-top"
              alt={subscription.title}
            />
            <div className="card-body">
              <h5 className="card-title">{subscription.title}</h5>
              <p className="card-text">{subscription.artist}</p>
              <p className="card-text">{subscription.year}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-subscriptionid={subscription.id}
                  onClick={this.removeSubscription}
                >
                  Remove
                </button>
              </li>
            </ul>
          </div>
        </div>
      ),
    );
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  removeSubscription = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    // @ts-ignore
    const subscriptionId = event.target.getAttribute('data-subscriptionid');

    await axios({
      method: 'DELETE',
      url: `${environment.host}/user/subscription/${subscriptionId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await this.fetchSubscriptions();
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Forum
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/home"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/logout">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <h2 className="text-center">User</h2>
          <div className="d-flex justify-content-center">
            <div className="p-2">
              <p>Email: {this.state.email}</p>
              <p>Username: {this.state.username}</p>
              <p>
                <a href="/music">Click here</a> to search and subscribe to music
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {this.showSubscriptions()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
