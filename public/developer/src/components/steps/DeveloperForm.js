import React, { Component } from 'react';
import API from 'Common/utils/API';

import { LoadingCog } from 'Common/loading'

// Form components
import Dev from './Form/Dev';
import Complete from './Form/Complete'
import { SubmitBtn } from './Form/FormElements'

class DeveloperForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      membership_check_results: [],
      loading: true,
      error: { status: false, body: {} }
    }

    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    let { networksToCheck } = this.props;
    let payload = { networksToCheck };

    API.member.checkMembership(payload)
      .then(res => {
        console.log(res.data.results)
        let membership_check_results = res.data.results;
        this.setState({
          membership_check_results,
          loading: false
        });

      })
      .catch(err => {
        console.log(err);
        let error = { status: true, body: err };
        
        this.setState({
          error,
          loading: false
        });

      })
  }

  // If it finds at least ONE false instance of isMember,
  // it will render both forms. Otherwise, just dev form.
  renderForm() {
    let count = 0;
    let { membership_check_results } = this.state;

    for (let i = 0; i < membership_check_results.length; i++) {
      if (!membership_check_results[i].isMember)
        count++
    }

    let { handleInputChange } = this.props;

    if (count > 0) {
      return (
        <div>
          <header>
            <p>
              Developers also have access to all the benefits regular network
              members have.(In fact, developers are just members with added
              "priviledges", such as access to work in the marketplace).
            </p>
            <p>
              It seems like you are not registered as a member of 
              <strong> one or more</strong> of the networks you selected...
              Don't worry! We'll just gather some additional information and
              register you as a member of whichever network(s) you aren't
              registered for.
            </p>
            <p>
              For networks that you have already signed up for, we will just
              register you as a developer.
            </p>
          </header>

          <Complete
            handleInputChange={handleInputChange}
          />
          <hr />
          <Dev
            handleInputChange={handleInputChange}
          />
          <SubmitBtn
            text="Complete Registration"
            handleSubmit={this.props.handleSubmit}
            load={this.state.membership_check_results}
          />
        </div>
      )
    } else {
        return (
          <div>
            <Dev
              handleInputChange={handleInputChange}
            />
            <SubmitBtn
              text="Complete Registration"
              handleSubmit={this.props.handleSubmit}
              load={this.state.membership_check_results}
            />
          </div>
      )
    }

  }

  render() {
    return (
      <form
        id="developer-form"
        style={{ width: '70%', margin: '0 auto 20px' }}
      >
        {/* <h1>This is where you fill out a form!</h1> */}

        <a href='#' onClick={() => this.props.changePage('network-selection')}>
          Back to Network Selection
        </a>

        {!this.state.loading ? this.renderForm() : <LoadingCog />}
      </form>
    );
  }

}

export default DeveloperForm