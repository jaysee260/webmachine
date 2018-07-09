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
      form: { member: {}, developer: {} }
    };

    // bindings
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleNetworkSelection = this.handleNetworkSelection.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    let { form } = this.state;
    let form_section = e.target.parentElement.parentElement.parentElement;

    // Separates form input into a section of their
    // respective category.
    // Inspect state of DeveloperRegistration using
    // React dev tools to watch behavior.
    if (form_section.classList.contains('member')) {
      form.member[e.target.id] = e.target.value;
      this.setState({ form });
    } else if (form_section.classList.contains('developer')) {
      form.developer[e.target.id] = e.target.value;
      this.setState({ form });
    }

  }

  handleSubmit(e, load) {
    e.preventDefault();
    let membership_check_results = load;
    let { networks } = this.state;

    console.log(membership_check_results, networks);

    let registerAsMember = [], registerAsDev = [];

    for (let i = 0; i < networks.length; i++) {
      for (let j = 0; j < membership_check_results.length; j++) {
        if (membership_check_results[j].networkId === networks[i] && !membership_check_results[j].isMember) {
          registerAsMember.push(networks[i]);
          registerAsDev.push(networks[i])
        } else {
          registerAsDev.push(networks[i])
        }
      }
    }

    console.log({registerAsMember},{registerAsDev})
    let memRegPromise, devRegPromise;

    if (registerAsMember.length > 0) {
      let memberPayload = this.state.form.member;
      memRegPromise = API.member.register(memberPayload);
    }
      
    if (registerAsDev.length > 0) {
      let devPayload = this.state.form.developer;
      devRegPromise = API.developer.register(devPayload)
    }

    // redirect to dashboard
    if (memRegPromise && devRegPromise) {
      Promise.all([memRegPromise, devRegPromise])
        .then(results => {
          console.log(results);
          //URI.redirect('/dashboard);
        })
        .catch(err => {
          console.log(err)
        });
    } else {
      Promise.resolve(devRegPromise)
        .then(result => {
          console.log(result);
          //URI.redirect('/dashboard);
        })
        .catch(err => {
          console.log(err);
        })
    }

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
          handleSubmit={this.handleSubmit}
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