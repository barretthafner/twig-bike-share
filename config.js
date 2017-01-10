// Instantiate config object -------------------------------------------------------------------
var config = {};

// Set config variables -------------------------------------------------------------------
config.adminUser = process.env.OPENBIKE_ADMIN;
config.adminPass = process.env.OPENBIKE_PASS;


config.ipAddress = process.env.IP;
config.port = process.env.PORT;
config.dbUrl = process.env.OPENBIKEDBURL;
config.appSecret = process.env.OPENBIKESECRET;


config.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
config.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
config.twilioSendingNumber = process.env.TWILIO_NUMBER;
config.twilioValidateUrl = 'https://open-bike-project.herokuapp.com/api/messaging/incoming';


config.mailgunApiKey = process.env.MAILGUN_APIKEY;
config.mailgunDomain = 'openbike.hafnerindustries.com';
config.mailgunFromEmail = 'NoReply <noreply@openbike.hafnerindustries.com>';

config.inviteSubject = '"Welcome to the Open Bike Project"';


// Export module -------------------------------------------------------------------
module.exports = config;
