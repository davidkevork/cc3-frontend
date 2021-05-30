import React, { Component } from 'react';
import HomeNav from '../HomeNav/HomeNav';

class Home extends Component<Record<any, any>, Record<string, any>> {
  render() {
    return (
      <React.Fragment>
        <HomeNav />
      </React.Fragment>
    );
  }
}

export default Home;
