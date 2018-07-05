import React, { Component } from 'react';
import Label from '../FormElements/Label';
import Input from '../FormElements/Input';
import Select from '../FormElements/Select';
import state_abbreviations from '../../data/state_abbreviations';

/**
 * ---- Form Fields ----
 * First Name 
 * Last Name
 * Image (?)
 * Address 1 & 2
 * City, State, Zip
 * Cell
 * Email
 */

 // Global reference to document object
 const d = window.document;
// Global reference to localStorage
const ls = window.localStorage;

/**
 * * @prop {Object} formValues
 * Object in parent's state that keeps track of form values
 * 
 * @prop {Function} this.props.changePage
 * Used to update page location in parent's state
 * 
 * @prop {Function} this.props.handleChange
 * Directly updates parent's state.
 * 
 * @prop {Function} this.props.handleSubmit
 * Triggers submission in parent's state
*/

class MemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @todo Create method to upload a picture ?
   * 1. Upload it to cloudinary
   * 2. Get URL back
   * 3. Save IMG URL into state
   */

  render() {
    let {
      firstName, lastName, phone, email,
      address1, address2, city, state, zip
    } = this.props.formValues;
    return (
      <form id='member-form' style={{ width: '70%', margin: '0 auto' }}>
        {/* <h4 className="form-title">Last Step</h4> */}
        <a href='#' onClick={() => this.props.changePage('networks-to-join')}>
          Back to Network Selection
        </a>
        <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='firstName' innerText='First Name' />
            <Input
              type='text' placeholder='John'
              id='firstName' value={firstName}
              handleInput={this.props.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <Label forHtml='lastName' innerText='Last Name' />
            <Input
              type='text' placeholder='Smith'
              id='lastName' value={lastName}
              handleInput={this.props.handleChange}
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='phone' innerText='Phone Number' />
            <Input
              type='text' placeholder='111-222-3333'
              id='phone' value={phone}
              handleInput={this.props.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <Label forHtml='email' innerText='Email' />
            <Input
              type='email' placeholder='email@domain.com'
              id='email' value={email}
              handleInput={this.props.handleChange}
            />
          </div>

        </div>

          <div className="form-group">
            <Label forHtml='address1' innerText='Address Line 1' />
            <Input
              type='text' placeholder='100 Main St.'
              id='address1' value={address1}
              handleInput={this.props.handleChange}
            />
          </div>
          <div className="form-group">
            <Label forHtml='address2' innerText='Address Line 2' />
            <Input
              type='text' placeholder='Apartment, Studio or Floor'
              id='address2' value={address2}
              handleInput={this.props.handleChange}
            />
          </div>

        <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='city' innerText='City' />
            <Input
              type='text' id='city'
              value={city}
              handleInput={this.props.handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <Label forHtml='state' innerText='State' />
            <Select
              id='state' options={state_abbreviations}
              value={state}
              handleInput={this.props.handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <Label forHtml='zip' innerText='Zip Code' />
            <Input
              type='text' id='zip'
              value={zip}
              handleInput={this.props.handleChange}
            />
          </div>

        </div>
        
        <button
          onClick={this.props.handleSubmit}
          type="submit" className="btn btn-primary"
        >
          Complete Registration
        </button>
      </form>
    );
  }
}

export default MemberForm;
