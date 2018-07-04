import React, { Component } from 'react';
import API from 'Common/utils/API';

class DeveloperForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      membership_check: [],
      loading: true,
      error: { status: false, body: {} }
    }
  }

  componentDidMount() {
    let { networksToCheck } = this.props;
    let payload = { networksToCheck };

    API.member.checkMembership(payload)
      .then(res => {
        console.log(res.data.results)
        let membership_check = res.data.results;
        this.setState({
          membership_check,
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

  render() {
    return (
      <div>
        <h1>This is where you fill out a form!</h1>
        {!this.state.loading && !this.state.membership_check[0].isMember ? "not a member" : "a member"}
      </div>
    );
  }

}

export default DeveloperForm