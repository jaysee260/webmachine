import React, { Component } from 'react'
import API from 'Common/utils/API';

import { LoadingCog } from 'Common/loading'

class NetworkSelection extends Component {
  constructor(props) {

    super(props);
    this.state = {
      networks_with_market: [],
      loading: true
    }

    // bindings
    this.toggleActiveClass = this.toggleActiveClass.bind(this);
    this.addNetworkToState = this.addNetworkToState.bind(this);
    this.removeNetworkFromState = this.removeNetworkFromState.bind(this);

  }

  /**
   * @description
   * Fetches Public Clients with a
   * Market and saves them into state
   */
  componentDidMount() {
    
    API.client.getPublicClientsWithMarket()
      .then(res => {
        let networks_with_market = res.data.payload;
        this.setState({
          networks_with_market,
          loading: false
        });
      })
      .catch(err => {
        // Self suggestion for more
        // graceful error handling:
        // if err, save into state and
        // VISUALLY notify user without crashing page
        console.log(err);
      })

  }


  /**
   * @method toggleActiveClass
   * @param {Object} e (click event)
   * @description
   * Adds or removes .active class to/from <li>.
   * If .active is added, network id is lifted to parent's state.
   * If .active is removed, network id is removed from parent's state.
  */
  toggleActiveClass(e) {
    let elem = e.target;

    if (!elem.classList.contains('active')) {
      elem.classList.add('active');
      this.addNetworkToState(elem.id);
    } else {
      elem.classList.remove('active');
      this.removeNetworkFromState(elem.id);
    }
  }

  /**
   * @method addNetworkToState
   * @param {String} net_id
   * @description
   * Gets called when .active class is added to <li>.
   * Adds network id to networks Array in parent's state
  */
  addNetworkToState(net_id) {
    let { networks } = this.props;
    networks = networks.concat(net_id);
    this.props.handleSelectionChange(networks);
  }

  /**
   * @method removeNetworkFromState
   * @param {String} net_id
   * @description
   * Gets called when .active class is removed from <li>.
   * Removes network id from networks Array in parent's state.
  */
  removeNetworkFromState(net_id) {
    let { networks } = this.props;
    let index = networks.indexOf(net_id);
    if (index > -1) {
      networks.splice(index, 1);
      this.props.handleSelectionChange(networks);
    }
  }

   /** 
   * @method renderNetworks
   * @description
   * Renders networks with a marketplace as a list-group.
   * @returns {NodeList}
  */
  renderNetworks() {
    let { networks_with_market } = this.state;

    return (
      <ul
        id="networks-with-market"
        className="list-group list-group-flush"
        style={{overflowY: 'scroll', maxHeight: '250px'}}
      >
        {networks_with_market.map((n, i) => (
          <li
            id={n._id} key={i+1}
            className="list-group-item network"
            onClick={this.toggleActiveClass}
          >
            {n.name}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div
        className="step1-network-selection"
        style={{textAlign: 'center', padding: '10px', position:'relative'}}
      >
        
        <header>

          <h3 className="title">Some networks support Marketplaces</h3>
          <h5 className='subtitle'>A marketplace is an environment where developers can browse through workitems matching their skillset.</h5> 
          <h5 className='subtitle'>As a developer of a network, you have the ability to "pick up" workitems and complete them by their respective deadlines.</h5>
          <h5 className='subtitle'>Once a workitem has been completed, reviewed and approved by an admin, payment is released to the developer.</h5>

        </header>


        <main>

          <section id="networks-with-market">
          
            <div className="row m-4">
              <div className="col-md-8 offset-md-2 col-sm-12">
                {this.state.loading ? <LoadingCog /> : this.renderNetworks()}
              </div>
            </div>

          </section>

        </main>


        <footer>

          <a
            href="#"
            onClick={() => this.props.changePage("developer-form")}
          >
            Next
          </a>

        </footer>

      </div>
    );
  }
}

export default NetworkSelection;