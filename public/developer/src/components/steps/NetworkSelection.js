import React, { Component } from 'react'
import API from 'Common/utils/API';

class NetworkSelection extends Component {
  constructor(props) {

    super(props);
    this.state = {
      networks_with_market: []
    }

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
        this.setState({ networks_with_market });
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
            // onClick={}
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

          {/* <h4 className="form-title">Step 1</h4> */}
          <h3 className="title">Some networks support Marketplaces.</h3>
          <h5 className='subtitle'>A marketplace is an environment where developers can browse through workitems matching their skillset.</h5> 
          <h5 className='subtitle'>As a developer of a network, you have the ability to "pick up" workitems and complete them by its respective deadline.</h5>
          <h5 className='subtitle'>Once a workitem has been completed, reviewed and approved by an admin, payment is released to the developer.</h5>

        </header>


        <main>

          <section id="networks-with-market">
          
            <div className="row m-4">
              <div className="col-md-8 offset-md-2 col-sm-12">
                {this.renderNetworks()}
              </div>
            </div>

          </section>

        </main>

      </div>
    );
  }
}

export default NetworkSelection;