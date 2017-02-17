// Instantiate config object -------------------------------------------------------------------
var config = {};

// Set config variables -------------------------------------------------------------------
config.adminUser = process.env.OPENBIKE_ADMIN;
config.adminPass = process.env.OPENBIKE_PASS;


config.ipAddress = process.env.IP;
config.port = process.env.PORT;
config.dbUrl = process.env.OPENBIKEDBURL;
config.appSecret = process.env.OPENBIKESECRET;

config.appDomain = process.env.APP_DOMAIN;

config.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
config.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
config.twilioSendingNumber = process.env.TWILIO_NUMBER;
config.twilioValidateUrl = 'https://' + config.appDomain + '/api/messaging/incoming';


config.mailgunApiKey = process.env.MAILGUN_APIKEY;
config.mailgunDomain = config.appDomain;
config.mailgunFromEmail = 'NoReply <noreply@' + config.appDomain + '>';

config.inviteSubject = '"Welcome to the Open Bike Project"';


// Export module -------------------------------------------------------------------
module.exports = config;
