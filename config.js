// Instantiate config object -------------------------------------------------------------------
var config = {};

// set from environment
config.ipAddress = process.env.IP;
config.port = process.env.PORT;

// Set config variables -------------------------------------------------------------------
config.adminPass = process.env.OPENBIKE_PASS;
config.adminUser = process.env.OPENBIKE_ADMIN;
config.appDomain = process.env.APP_DOMAIN;
config.appSecret = process.env.OPENBIKE_SECRET;
config.dbUrl = process.env.OPENBIKE_DB_URL;
config.mailgunApiKey = process.env.MAILGUN_APIKEY;
config.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
config.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
config.twilioSendingNumber = process.env.TWILIO_NUMBER;

config.inviteSubject = '"Welcome to the Open Bike Project"';
config.mailgunDomain = config.appDomain;
config.mailgunFromEmail = 'NoReply <noreply@' + config.appDomain + '>';
config.twilioValidateUrl = 'http://' + config.appDomain + '/api/messaging/incoming';
config.twilioValidateUrl = 'http://fefba595.ngrok.io/api/messaging/incoming'; 


// Export module -------------------------------------------------------------------
module.exports = config;
