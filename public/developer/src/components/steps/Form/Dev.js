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
            <h3>Personal Information</h3>
          </div>
          <div className="form-group col-md-6">
            <Label formHtml="github" innerText="GitHub Username"/>
            <Input
              type="text" placeholder="@example"
              id="github"
              // value=""
            />
          </div>
          <div className="form-group col-md-6">
            <Label formHtml="ssn" innerText="Social Security Number"/>
            <Input
              type="number" placeholder="333-22-4444"
              id="ssn"
              // value=""
            />
          </div>

        </div>

        <div className="form-row">
        
          <div className="form-group col-md-12">
            <h3>Payment Related Information</h3>
          </div>

          <div className="form-group col-md-12">
            <Label formHtml="bank_name" innerText="Bank Name"/>
            <Input
              type="text" placeholder="i.e. Bank of America"
              id="bank_name"
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
              // value=""
            />
          </div>

          <div className="form-group col-md-6">
            <Label formHtml="routing_number" innerText="Routing Number"/>
            <Input
              type="text" placeholder="987654321"
              id="routing_number"
              // value=""
            />
          </div>
        
        </div>

      </section>
    );
  }

}

export default Dev