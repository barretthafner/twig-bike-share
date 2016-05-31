var middleware = require("./middleware");

// Instantiate config object -------------------------------------------------------------------

var config = {};

// Set environment variables -------------------------------------------------------------------

config.accountSid    = process.env.TWILIO_ACCOUNT_SID;
config.authToken     = process.env.TWILIO_AUTH_TOKEN;
config.sendingNumber = process.env.TWILIO_NUMBER;

// Configure function -------------------------------------------------------------------

config.configure = function(expressApp) {

  var app = expressApp;

  // Twilio -------------------------------------------------------------------
  var requiredConfig = [config.accountSid, config.authToken, config.sendingNumber];
  var isConfigured = requiredConfig.every(function(configValue) {
    return configValue || false;
  });

  if (!isConfigured) {
    var errorMessage =
      'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

    throw new Error(errorMessage);
  }

  // Mount middleware to notify Twilio of errors
  app.use(middleware.twilioNotifyOnError);

};

// Export module -------------------------------------------------------------------
module.exports = config;
