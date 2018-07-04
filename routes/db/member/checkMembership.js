'use strict'

//////////////////////////////////////////////
//////// route for checking membership ///////
//////////////////////////////////////////////

const { getIdFromToken } = require('../../../utils/auth/verifyJwtToken');


const checkMembership = router => {

  router.get('/', (req, res, next) => {
    let auth_header = req.headers.authorization;
    let idToken = getIdFromToken(auth_header);

    if(!idToken) {

      res.status(404).json({
        isMember: false,
        auth0_id: null,
        msg: "No id token found",
        route_status: "Under construction"
      });

    } else {

      res.status(200).json({
        isMember: null,
        auth0_id: idToken,
        msg: "id token found",
        route_status: "Under construction"
      });

    }

  })

}

module.exports = checkMembership