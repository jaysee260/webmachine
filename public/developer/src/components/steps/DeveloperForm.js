import React, { Component } from 'react';
import API from 'Common/utils/API';

import { LoadingCog } from 'Common/loading'

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

    if (count > 0) {
      return (
        <p>Fills out Member and Dev form</p>
      )
    } else {
      return (
        <p>Fills out Dev form only</p>
      )
    }

  }

  render() {
    return (
      <div>
        <h1>This is where you fill out a form!</h1>
        {!this.state.loading ? this.renderForm() : <LoadingCog />}
      </div>
    );
  }

}

export default DeveloperForm