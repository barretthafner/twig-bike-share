'use strict';

var config = {};

// Get server configurations
config.env = global.environment || process.env.NODE_ENV || 'development';
config.ipAddress = process.env.IP;
config.port = process.env.PORT;

// Get environemnt configurations -------------------------------------------------------------------
config.appDomain = process.env.APP_DOMAIN;
config.appSecret = process.env.SESSION_SECRET;
config.dbUrl = process.env.DB_URL;
config.mailgunPrivateApiKey = process.env.MAILGUN_PRIVATE_API_KEY;
config.mailgunDomain = process.env.MAILGUN_DOMAIN;
config.mailgunFromEmail = process.env.MAILGUN_EMAIL;
config.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
config.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
config.twilioSendingNumber = process.env.TWILIO_NUMBER;
config.siteTitle = process.env.SITE_TITLE || 'Twig Bike Share';
config.supportSite = process.env.SUPPORT_SITE || '/';
config.supportEmail = process.env.SUPPORT_EMAIL || '';
config.supportTimeZone = process.env.TIME_ZONE || 'America/Los_Angeles';
config.protocol = process.env.SECURE ? 'https://' : 'http://';

// Config app routes
config.routes = {
	root: '/',
	admin: '/a',
	administrators: '/a/administrators',
	bikes: '/a/bikes',
	logout: '/a/logout',
	data: '/a/data',
	subscriberGroups: '/a/subscriber-groups',
	locations: '/a/locations',
	setup: '/setup',
	subscribers: '/subscribers',
	twilioApi: '/twilio',
	twilioApiIncomingMessage: '/msg',
	twilioApiIncomingVoice: '/voice',
	signUp: '/signup',
	legal: '/legal',
	newValidation: '/newValidation',
	checkouts: '/checkouts',
	subscriberEmailData: '/subscribers',
	messages: '/messages'
};

module.exports = config;
