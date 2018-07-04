import React, { Component } from 'react';
import Auth from '../../home/src/Pages/Auth/Auth'
import { BackToDashboard } from '../../common/navigation'

// Import stages of the process
import NetworkSelection from './components/steps/NetworkSelection';


class DeveloperRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'network-selection',
      networks: [],
      developer_form: {}
    };
  }

  // If user isn't authenticated,
  // redirect to login
  componentWillMount() {
    let auth = new Auth();
    if (!auth.isAuthenticated())
      auth.login()
  }

  renderPage() {

   let { location } = this.state;

   if (location === 'network-selection') {
     return (
       <NetworkSelection />
     )
   } else if (location === 'developer-form') {
     return (
       <h1>This is where you fill out a form</h1>
     )
   } else {
     // If, for whatever reason, the value of location is wiped out
      // from state, render the first step of the registration process.
     return (
       <NetworkSelection />
     )
   }

  }

  render() {
    return (
      <div className="container">
        <BackToDashboard />
        {this.renderPage()}
      </div>
    )
  }
}

export default DeveloperRegistration;