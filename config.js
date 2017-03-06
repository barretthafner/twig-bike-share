'use strict';
// Instantiate config object -------------------------------------------------------------------
var config = {};

// Get server configurations
config.env = global.environment || process.env.NODE_ENV || 'development';
config.ipAddress = process.env.IP;
config.port = process.env.PORT;

// Get environemnt configurations -------------------------------------------------------------------
config.appDomain = process.env.APP_DOMAIN;
config.appSecret = process.env.SESSION_SECRET;
config.dbUrl = config.env === 'test' ? 'mongodb://localhost/openbike' : process.env.DB_URL;
config.mailgunPrivateApiKey = process.env.MAILGUN_PRIVATE_API_KEY;
config.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
config.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
config.twilioSendingNumber = process.env.TWILIO_NUMBER;

// Set composed configurations
config.mailgunDomain = 'openbike.hafnerindustries.com';//config.appDomain;
config.mailgunFromEmail = 'NoReply <noreply@' + /*config.appDomain*/'openbike.hafnerindustries.com' + '>';

config.siteTitle = 'WTA Bike Share';
config.protocol = 'http://';

config.routes = {
	root: '/',
	admin: '/a',
	administrators: '/a/administrators',
	bikes: '/a/bikes',
	invite: '/a/invite',
	logout: '/a/logout',
	settings: '/a/settings',
	setup: '/setup',
	subscriberGroups: '/a/subscriber-groups',
	subscribers: '/a/subscribers',
	twilioApi: '/twilio',
	twilioApiIncomingMessage: '/msg',
	twilioApiIncomingVoice: '/voice',
	signUp: '/signup'
};

// Export module -------------------------------------------------------------------
module.exports = config;
