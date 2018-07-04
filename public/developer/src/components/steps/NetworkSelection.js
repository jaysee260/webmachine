import React, { Component } from 'react'

class NetworkSelection extends Component {
  constructor(props) {

    super(props);
    this.state = {
      networks_with_market: []
    }

  }

  componentDidMount() {
    // retrieve networks with market
    // and save into state
  }

  render() {
    return (
      <p>These are the networks with a market</p>
    );
  }
}

export default NetworkSelection;