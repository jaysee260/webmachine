import React, { Component } from 'react';
import Auth from '../../home/src/Pages/Auth/Auth'
import { BackToDashboard } from '../../common/navigation'

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
      <div className="container">
        <BackToDashboard />
        <h1>Developer Registration Page</h1>
      </div>
    )
  }
}

export default DeveloperRegistration;