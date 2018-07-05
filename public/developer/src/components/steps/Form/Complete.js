import React, { Component } from 'react'

import {
  Input,
  Label,
  Select
} from './FormElements'
import state_abbreviations from '../../../../../member/src/data/state_abbreviations'

class Complete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="member">
        <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='firstName' innerText='First Name' />
            <Input
              type='text' placeholder='John'
              id='firstName'
              // value={firstName}
              handleInput={this.props.handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <Label forHtml='lastName' innerText='Last Name' />
            <Input
              type='text' placeholder='Smith'
              id='lastName'
              // value={lastName}
              handleInput={this.props.handleInputChange}
            />
          </div>

          </div>

          <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='phone' innerText='Phone Number' />
            <Input
              type='text' placeholder='111-222-3333'
              id='phone'
              // value={phone}
              handleInput={this.props.handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <Label forHtml='email' innerText='Email' />
            <Input
              type='email' placeholder='email@domain.com'
              id='email'
              // value={email}
              handleInput={this.props.handleInputChange}
            />
          </div>

          </div>

          <div className="form-group">
            <Label forHtml='address1' innerText='Address Line 1' />
            <Input
              type='text' placeholder='100 Main St.'
              id='address1'
              // value={address1}
              handleInput={this.props.handleInputChange}
            />
          </div>
          <div className="form-group">
            <Label forHtml='address2' innerText='Address Line 2' />
            <Input
              type='text' placeholder='Apartment, Studio or Floor'
              id='address2'
              // value={address2}
              handleInput={this.props.handleInputChange}
            />
          </div>

          <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='city' innerText='City' />
            <Input
              type='text' id='city'
              // value={city}
              handleInput={this.props.handleInputChange}
            />
          </div>
          <div className="form-group col-md-4">
            <Label forHtml='state' innerText='State' />
            <Select
              id='state' options={state_abbreviations}
              // value={state}
              handleInput={this.props.handleInputChange}
            />
          </div>
          <div className="form-group col-md-2">
            <Label forHtml='zip' innerText='Zip Code' />
            <Input
              type='text' id='zip'
              // value={zip}
              handleInput={this.props.handleInputChange}
            />
          </div>

          </div>

          {/* <button
            // onClick={this.props.handleSubmit}
            type="submit" className="btn btn-primary"
          >
          Complete Registration
          </button> */}
      </section>
    );
  }

}

export default Complete