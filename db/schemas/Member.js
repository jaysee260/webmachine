'use strict';

///////////////////////////////////////////////////////////////////////////
/////////////// Partner Schema: Developers, Designers, SQE ///////////////
//////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// notes:
// refactor - areas to explore include capturing github auth data, auth via cell,
// management of workitems, payments data info
// need to identify some unique identifier for each partner

const memberObject = {
  firstName: String,
  lastName: String,
  image: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  cell: String,
  email: String,
  auth0Id: String,
  networks: [ String ],
  isDev: {
    type: Boolean,
    default: false
  },
  // dev_profile: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Partner',
  //   default: null
  // },
  joinDate: {
    type: Date,
    default: Date.now()
  }
}

const memberSchema = new Schema(memberObject, { collection: 'Member' });

var Member = mongoose.model("Member", memberSchema);

module.exports = { Member, memberSchema }
