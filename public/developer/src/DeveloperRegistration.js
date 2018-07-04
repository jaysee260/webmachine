import React, { Component }     from 'react';
import Auth                     from '../../home/src/Pages/Auth/Auth'
import { BackToDashboard }      from '../../common/navigation'

// Import stages of the process
import NetworkSelection from './components/steps/NetworkSelection';
import DeveloperForm from './components/steps/DeveloperForm';


class DeveloperRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'network-selection',
      networks: [],
      developer_form: {}
    };

    // bindings
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleNetworkSelection = this.handleNetworkSelection.bind(this);
  }

  // If user isn't authenticated,
  // redirect to login
  componentWillMount() {
    let auth = new Auth();
    if (!auth.isAuthenticated())
      auth.login()
  }


  /**
   * @param {String} location
   * Passed to children to handle page changes
   */
  handlePageChange(location) {
    this.setState({ location });
  }


  /**
   * @param {Array} networks_to_join
   * Passed to NetworkSelection stage to allow
   * for the lifting up of networks_with_market
   */
  handleNetworkSelection(networks) {
    this.setState({ networks });
  }



  renderPage() {

   let { location } = this.state;

   if (location === 'network-selection') {
     return (
        <NetworkSelection
          networks={this.state.networks}
          changePage={this.handlePageChange}
          handleSelectionChange={this.handleNetworkSelection}
        />
     )
   } else if (location === 'developer-form') {
     return (
       <DeveloperForm
          networksToCheck={this.state.networks}
       />
     )
   } else {
     // If, for whatever reason, the value of location is wiped out
      // from state, render the first step of the registration process.
     return (
        <NetworkSelection
          networks={[]}
          changePage={this.handlePageChange}
          handleSelection={this.handleNetworkSelection}
        />
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