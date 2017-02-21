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
config.twilioValidateUrl = 'http://' + config.appDomain + '/twillio/messaging/incoming';
config.twilioValidateUrl = 'http://fefba595.ngrok.io/api/messaging/incoming';

// Export module -------------------------------------------------------------------
module.exports = config;
