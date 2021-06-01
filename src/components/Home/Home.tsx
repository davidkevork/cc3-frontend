import React, { Component } from 'react';
import HomeNav from '../HomeNav/HomeNav';
import './Home.css';

interface IHomeState {
  carMake?: string;
  carModel?: string;
  carYear?: number;
  carRego?: string;
}

class Home extends Component<any, IHomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      carMake: undefined,
      carModel: undefined,
      carYear: undefined,
      carRego: undefined,
    };
  }
  render() {
    return (
      <React.Fragment>
        <HomeNav />
      </React.Fragment>
    );
  }
}

export default Home;
