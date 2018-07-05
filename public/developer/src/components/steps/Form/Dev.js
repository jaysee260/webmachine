import React, { Component } from 'react'

import {
  Input,
  Label,
  Select
} from './FormElements'

class Dev extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="developer">

        <div className="form-row">

          <div className="form-group col-md-12">
            <h3>Developer Information</h3>
          </div>
          <div className="form-group col-md-12">
            <Label formHtml="github" innerText="GitHub Username"/>
            <Input
              type="text" placeholder="urbancoder"
              id="github"
              handleInput={this.props.handleInputChange}
              // value=""
            />
          </div>

        </div>

        <div className="form-row">
        
          <div className="form-group col-md-12">
            <h3>Payment Related Information</h3>
          </div>

          <div className="form-group col-md-6">
            <Label formHtml="bank_name" innerText="Bank Name"/>
            <Input
              type="text" placeholder="i.e. Well Fargo"
              id="bank_name"
              handleInput={this.props.handleInputChange}
              // value=""
            />
          </div>

          <div className="form-group col-md-6">
            <Label formHtml="ssn" innerText="Social Security Number"/>
            <Input
              type="number" placeholder="333-22-4444"
              id="ssn"
              handleInput={this.props.handleInputChange}
              // value=""
            />
          </div>

        </div>

        <div className="form-row">
        
          <div className="form-group col-md-6">
            <Label formHtml="account_number" innerText="Account Number"/>
            <Input
              type="text" placeholder="123456789"
              id="account_number"
              handleInput={this.props.handleInputChange}
              // value=""
            />
          </div>

          <div className="form-group col-md-6">
            <Label formHtml="routing_number" innerText="Routing Number"/>
            <Input
              type="text" placeholder="987654321"
              id="routing_number"
              handleInput={this.props.handleInputChange}
              // value=""
            />
          </div>
        
        </div>

      </section>
    );
  }

}

export default Dev