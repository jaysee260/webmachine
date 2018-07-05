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
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
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
    // Value of location inicates where we're navigating TO.
    // This decision structure ensures that at least one network is
    // selected before proceeding to fill out the form.
    if (location === 'developer-form' && this.state.networks.length === 0)
      alert('Please select at least one network before proceeding')
    else
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

  /**
   * @param {Object} event
   * Makes DeveloperForm a controlled component
   */
  handleFormInputChange(e) {
    let { developer_form } = this.state;

    developer_form[e.target.id] = e.target.value;
    this.setState({ developer_form });
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
          changePage={this.handlePageChange}
          handleInputChange={this.handleFormInputChange}
       />
     )
   } else {
     // If, for whatever reason, the value of location is wiped out
      // from state, render the first step of the registration process.
     return (
        <NetworkSelection
          networks={[]}
          changePage={this.handlePageChange}
          handleSelectionChange={this.handleNetworkSelection}
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