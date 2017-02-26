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
config.mailgunDomain = config.appDomain;
config.mailgunFromEmail = 'NoReply <noreply@' + config.appDomain + '>';

config.siteTitle = 'WTA Bike Share';
config.protocol = 'http://';

config.routes = {
	root: '/',
	admin: '/a',
	admins: '/a/admins',
	bikes: '/a/bikes',
	invite: '/a/invite',
	logout: '/a/logout',
	settings: '/a/settings',
	setup: '/setup',
	subscriberGroups: '/a/subscriber-groups',
	subscribers: '/a/subscribers',
	twilioApi: '/twilio',
	twilioApiIncomingMessage: '/msg',
	twilioApiIncomingVoice: '/voice'
};

config.routeTree = {
	path: '/',
	adminPanel: {
		path: '/a',
		admins: {
			path: '/a/admins',
			new: { path: '/a/admins/new' },
			create: { path: '/a/admins' },
			edit: { path: '/a/admins/:admin_id/edit' },
			update: { path: '/a/admins/:admin_id' },
			destroy: { path: '/a/admins/:admin_id' }
		},
		bikes: {
			path: '/a/bikes',
			new: { path: '/a/bikes/new' },
			create: { path: '/a/bikes' },
			edit: { path: '/a/bikes/:bike_id/edit' },
			update: { path: '/a/bikes/:bike_id' },
			destroy: { path: '/a/bikes/:bike_id' }
		},
		subscriberGroups: {
			path: '/a/subscriber-groups',
			new: { path: '/a/subscriber-groups/new' },
			create: { path: '/a/subscriber-groups' },
			edit: { path: '/a/subscriber-groups/:id/edit' },
			update: { path: '/a/subscriber-groups/:id' },
			destroy: { path: '/a/subscriber-groups/:id' }
		}
	},
	setup: { path: '/setup' },
	twilioApi: {
		path: '/twilio',
		incomingMessage: { path: '/twilio/msg' },
		incomingVoice: { path: '/twilio/voice' }
	}
}

// Export module -------------------------------------------------------------------
module.exports = config;
