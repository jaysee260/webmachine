'use strict';

////////////////////////////////////////////////////////////
///// Router Entry Point for all Member related Routes /////
////////////////////////////////////////////////////////////

const registerMember        = require('express').Router()
const memberProfile         = require('express').Router()
const checkMembership       = require('express').Router()
const { verifyJWTToken }    = require('../../../utils/auth/verifyJwtToken')

require('./register')(registerMember)
require('./profile')(memberProfile)
require('./checkMembership')(checkMembership)

const member = (router) => {
  // Enforce authentication on all /member related routes
  // router.use(verifyJWTToken)

  /** @method POST */
  // api/db/member/register
  router.use('/register', registerMember)

  /** @method GET-PUT-DELETE */
  // api/db/member/profile/network/:clientId
  router.use('/profile/network', memberProfile)

  /** @method GET */
  // api/db/member/check-membership
  router.use('/check-membership', checkMembership)
}

module.exports = member