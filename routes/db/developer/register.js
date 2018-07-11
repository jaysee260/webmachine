'use strict';

/////////////////////////////////////////////////////
//////// route for new developer registration ///////
/////////////////////////////////////////////////////

const utils               = require('../../../utils');
const bodyParser          = require('body-parser');
const { getIdFromToken }  = require('../../../utils/auth/verifyJwtToken');

const mongoose            = require('mongoose');
const { Client }          = require('../../../db/schemas/Client');
const { partnerSchema }   = require('../../../db/schemas/Partner');

const registerDeveloper = (router) => {

  router.use(bodyParser.json())

  /**
   * @description
   * 1. Add developer's auth0Id to Client's Partners roster
   * 2. Create and save Partner Document into each of the
   *    selected Client's Database.
   */

  router.post('/', async (req, res, next) => {

    let { form, networks } = req.body;

    let devAuth0Id = getIdFromToken(req.headers.authorization);
    
    // Save developer id into Clients' partners field
    let query = { "_id": { "$in": networks } };
    let update = { "$push": { partners: devAuth0Id } }
    try {
      await Client.updateMany(query, update);
    } catch (error) {
      console.log(error)
    }
    
    // First fetch the URI for each client's DB
    let client_uris = await fetchURIs(networks);

    let partnerObj = buildPartnerObj(form);
    let result = {};
    client_uris.forEach(async client => {
      let dbURI = client.uri + client.dbname;
      let db = mongoose.createConnection(dbURI, { poolSize: 10 });
      let Partner = db.model('Partner', partnerSchema);

      try {
        result = await Partner.create(partnerObj);
      } catch (error) {
        result.error = error;
      }
    });

   // More resilient error handling:
   // What happens if creation of Parntner document fails?
   // Ought to be able to return a proper notification.

   if(!result.error) {
    res.json({ msg: 'Developer registration successful' });
   } else
    res.json({ msg: 'Developer registration failed; something went wrong' });
  })

}

async function fetchURIs(client_ids) {
  // Construct query
  let query = { "_id": { "$in": client_ids } };
  // Set query projection
  let projection = { "dbname": 1, "uri": 1 };
  // Retrieve URI and DBNAME for each match.
  let result = await Client.find(query, projection);
  return result;
}

function buildPartnerObj(payload) {
  return {
    github: payload.github,
    ssn: payload.ssn,
    payment_info: {
      bank_name: payload.bank_name,
      account_number: payload.account_number,
      routing_number: payload.routing_number
    }
  }
}

module.exports = registerDeveloper