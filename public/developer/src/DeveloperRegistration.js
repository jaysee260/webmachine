import React, { Component } from 'react';
import Auth from '../../home/src/Pages/Auth/Auth'

class DeveloperRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'networks-with-marketplace',
      networks: [],
      developer_form: {}
    };
  }

  componentWillMount() {
    let auth = new Auth();
    if (!auth.isAuthenticated())
      auth.login()
  }

  render() {
    return (
      <h1>Developer Registration Page</h1>
    )
  }
}

export default DeveloperRegistration;