const { Client } = require('../../../db/schemas/Client');
const { getIdFromToken }  = require('../../../utils/auth/verifyJwtToken');


const getAffiliatedNetworks = (router) => {

  router.get('/', async (req, res, next) => {

    // Capture user's auth0Id
    let devAuth0Id = getIdFromToken(req.headers.authorization);
    // Declare variable to store results from DB query
    let affiliatedNetworks;

    // Construct query
    let query = { partners: devAuth0Id };
    let string_projection = "name description image addr1 addr2 city state zip sms runsMarket";

    // Try fetching results.
    // If DB query results in error,
    // catch error and assign it to variable
    try {
      affiliatedNetworks = await Client.find(query, string_projection);
    } catch (error) {
      affiliatedNetworks = error;
    }

    // Return results as JSON with status code 200 - OK
    res.status(200).json({ affiliatedNetworks });

  });

}

module.exports = getAffiliatedNetworks