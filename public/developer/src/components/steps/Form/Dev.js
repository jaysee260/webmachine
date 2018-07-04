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

      </section>
    );
  }

}

export default Dev