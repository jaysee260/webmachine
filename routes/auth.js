'use strict';

////////////////////////////////////////////////////////
/////       Authorization and Creditaling   	     ////
/////    A message is analyzed for permissions    ////
/////     DB connection is secured for org        ////
/////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const mongoose =          	    require('mongoose')
const clone =     				require('clone-deep')
const platformarray =           require('../config').platform()
const keys =          			require('../config').init();
const { g, b, gr, r, y } =      require('../console')

const options = {
  	poolSize: 10, // Maintain up to 10 socket connections
	};

const auth = (router) => {
	router.use(bodyParser.json());

	router.use('/api', function(req, res, next) {

		console.log("-------------AUTHORIZATION-------------")
        // REFACTOR
		// inspect http api calls being made
		// platform will assign temporary auth token
        let test = undefined
        let apiPath = req.url

        test = apiPath.match(/github/g)
        if (test) {
        apiPath = '/github'
        }
        test = apiPath.match(/client/g);
        if(test) apiPath = '/db/client';
        console.log(req.url)
        console.log(apiPath)
        console.log(test)


		switch(apiPath) {
			case '/db/agent':
            case '/db/client':
            case '/github':
            case '/platform':
                const token = req.get('Authorization')

				if (token) {
					req.token = token }
			 	else {
					req.token = keys.token   // assign temp token
					}

				if (!req.body) {
					req.body = {}
					}

				req.body.ChaoticSource = "web"
				req.body.Token = "demo"
        break;

			default:
		}


	// configured for future capabilities, processing messages from various channels
	// as of 2/2018 - only configured for web http and sms channels

  switch(req.body.ChaoticSource) {
    case 'web':
        console.log('Message Source is Web')
        break;
    case 'sms':
        console.log('Message Source is SMS')
        break;
    case 'twt':
        console.log('Message Source is Twitter')
        break;
    case 'fbk':
        console.log('Message Source is Facebook')
        break;
    case 'tel':
        console.log('Message Source is Telegram')
        break;
    case 'wat':
        console.log('Message Source is WhatsApp')
        break;
    case 'slk':
        console.log('Message Source is Slack')
        break;
    case 'vbr':
        console.log('Message Source is Viber')
        break;
    case 'kik':
        console.log('Message Source is Kik')
        break;
    case 'lne':
        console.log('Message Source is Line')
        break;
    case 'snp':
        console.log('Message Source is SnapChat')
        break;
    case 'wec':
        console.log('Message Source is WeChat')
        break;
    case 'qq':
        console.log('Message Source is QQ')
        break;
    case 'api':
        console.log('Message Source is API Call')
        break;
    default:
        console.log('Message Source Not Detected - Assume Twilio')
        req.body.ChaoticSource = "sms"
}
	const token = req.get('Authorization')

  // filter platform config data based on the environment  - filter between prod and test
  let productionState = false

  if (process.env.isLive == "true") {
    productionState = true }

  let platform = platformarray.filter((p) => p.isLive == productionState)

  next()
 })
}

module.exports = auth
