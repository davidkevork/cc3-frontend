import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class App extends Component {
  constructor(props: any) {
    super(props);
    Auth.signOut().then(() => {
      props.history.push('/');
    });
  }
  render() {
    return (
    <div>
      <p>You are not logged out. Go to <a href="/login">login</a> page to login.</p>
    </div>
    );
  }
}

// @ts-ignore
export default withRouter(App);
