// Instantiate config object -------------------------------------------------------------------

var config = {};

// Set environment variables -------------------------------------------------------------------

config.ipAddress     = process.env.IP;
config.port          = process.env.PORT;
config.dbUrl         = process.env.OPENBIKEDBURL;
config.appSecret     = process.env.OPENBIKESECRET;


config.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
config.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
config.twilioSendingNumber = process.env.TWILIO_NUMBER;
config.twilioValidateUrl = 'https://42b1e6a7.ngrok.io/api/messaging/incoming';


config.mailgunApiKey = process.env.MAILGUN_APIKEY;
config.mailgunDomain = 'openbike.hafnerindustries.com';
config.mailgunFromEmail = 'NoReply <noreply@openbike.hafnerindustries.com';


// Export module -------------------------------------------------------------------
module.exports = config;
