import React, { Component } from 'react';

class App extends Component {
  constructor(props: any) {
    super(props);
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  render() {
    return (
    <div>
      <p>You are not logged out. Go to <a href="/login">login</a> page to login.</p>
    </div>
    );
  }
}

export default App;
