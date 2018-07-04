'use strict'

//////////////////////////////////////////////
//////// route for checking membership ///////
//////////////////////////////////////////////

const bodyParser              = require('body-parser')
const { getIdFromToken }      = require('../../../utils/auth/verifyJwtToken');

const mongoose                = require('mongoose');
const { Client }              = require('../../../db/schemas/Client');
const { memberSchema }        = require('../../../db/schemas/Member');


const checkMembership = router => {

  // Route middleware
  router.use(bodyParser.json());

  router.post('/', async (req, res, next) => {

    let auth_header = req.headers.authorization;
    let idToken = getIdFromToken(auth_header);
    let { networksToCheck } = req.body;

    let results = await Promise.all(networksToCheck.map(networkId =>
      isMember(networkId, idToken)
    ));

    res.status(200).json({
      results
    })
    
  })

}

module.exports = checkMembership

async function isMember(networkId, memberId) {
  // 1. Opens connection to Client's DB
  // 2. Checks for existence of Member in the Members Collection
  // 3. Returns true or false based on results

    // Fetch DB Keys of Client 
    const query1 = { "_id": networkId };
    const projection = { "dbname": 1, "uri": 1 };
    const dbKeys = await Client.findById(query1, projection);

    // Open connection to Client's DB and check for existence of Member
    const dbURI = dbKeys.uri + dbKeys.dbname;
    const db = mongoose.createConnection(dbURI, { poolSize: 10 });
    const Members = db.model('Member', memberSchema);

    const query2 = { "auth0Id": memberId };
    let result = await Members.find(query2);
    
    if (result.length == 0) {

      return {
        networkId: networkId,
        memberId: memberId,
        isMember: false
      };

    } else {

      return {
        networkId: networkId,
        memberId: memberId,
        isMember: true
      };

    }
}