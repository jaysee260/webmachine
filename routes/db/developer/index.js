'use strict';

///////////////////////////////////////////////////////////////
///// Router Entry Point for all Developer related Routes /////
///////////////////////////////////////////////////////////////

const registerDeveloper = require('express').Router();
const getAffiliatedNetworks = require('express').Router();
const { verifyJWTToken }    = require('../../../utils/auth/verifyJwtToken');

require('./register')(registerDeveloper);
require('./getAffiliatedNetworks')(getAffiliatedNetworks);


const developer = (router) => {

  router.use(verifyJWTToken);

  /** @method POST */
  router.use('/register', registerDeveloper);

  /** @method GET */
  router.use('/affiliated-networks', getAffiliatedNetworks);

};


module.exports = developer
