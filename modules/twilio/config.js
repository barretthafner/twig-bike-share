var Setting = require("../../models/Setting");

// Instantiate config object -------------------------------------------------------------------

var config = {};

// Set environment variables -------------------------------------------------------------------

Setting.getSettingByKey({key: "twilioAccountSid" }, function(err, setting) {
  if (err) {
    console.log(err);
  } else {
    console.log(setting.value);
    config.accountSid = setting.value;
  }
});

Setting.getSettingByKey({key: "twilioAuthKey" }, function(err, setting) {
  if (err) {
    console.log(err);
  } else {
    console.log(setting.value);
    config.authToken = setting.value;
  }
});

Setting.getSettingByKey({key: "twilioSendingNumber" }, function(err, setting) {
  if (err) {
    console.log(err);
  } else {
    console.log(setting.value);
    config.sendingNumber = setting.value;
  }
});

// config.accountSid    = process.env.TWILIO_ACCOUNT_SID;
// config.authToken     = process.env.TWILIO_AUTH_TOKEN;
// config.sendingNumber = process.env.TWILIO_NUMBER;

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

};

// Export module -------------------------------------------------------------------
module.exports = config;
