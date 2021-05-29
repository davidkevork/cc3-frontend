import React from 'react';
import { hot } from 'react-hot-loader';
import IndexNav from '../../IndexNav/IndexNav';
import SignInUp from './SignInUp/SignInUp';
import HowItWorks from './HowItWorks/HowItWorks';
import Advantages from './Advantages/Advantages';
import Security from './Secutiry/Security';
import Subscribe from './Subscribe/Subscribe';
import Footer from './Footer/Footer';

class IndexPage extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
  }
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <IndexNav />
        <div className="lp_wrapper">
          <SignInUp />
          <HowItWorks />
          <Advantages />
          <Security />
        </div>
        <Subscribe />
        <Footer />
      </React.Fragment>
    );
  }
}

export default hot(module)(IndexPage);
