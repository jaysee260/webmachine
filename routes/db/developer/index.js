'use strict';

///////////////////////////////////////////////////////////////
///// Router Entry Point for all Developer related Routes /////
///////////////////////////////////////////////////////////////

const registerDeveloper = require('express').Router();
const { verifyJWTToken }    = require('../../../utils/auth/verifyJwtToken');

require('./register')(registerDeveloper);


const developer = (router) => {

  router.use('/register', registerDeveloper);

};


module.exports = developer
