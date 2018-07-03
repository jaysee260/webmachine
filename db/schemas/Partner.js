'use strict';

//////////////////////////////////////////////////////////////////////////
///////////////Partner Schema: Developers, Designers, SQE ///////////////
////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
const uuidv1 =  require('uuid/v1')
const Schema = mongoose.Schema;


// REFACTOR - EXPLORE MONGOOSE POPULATE TO SYNC WITH MEMBER COLLECTION

const partnerObject = {
  member_id: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    unique: true
  },
  github: {
    type: String,
    unique: true
  },
  competencies: Array,
  ssn: {
    type: String,
    unique: true
  },
  workitems: {
    active: Array,
    pending: Array,
    completed: Array,
    abandoned: Array
  },
  payment_info: {
    bank_name: String,
    bank_account: {
      type: String,
      unique: true
    },
    routing_number: {
      type: String,
      unique: true
    },
    payments_received: {
      type: Number,
      default: 0
    }
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}

const partnerSchema = new Schema(partnerObject, { collection: 'Partner' });

var Partner = mongoose.model("Partner", partnerSchema);

module.exports = { Partner, partnerSchema }
