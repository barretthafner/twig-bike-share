var twilio = require('twilio');

var accountSid    = process.env.TWILIO_ACCOUNT_SID;
var authToken     = process.env.TWILIO_AUTH_TOKEN;
var sendingNumber = process.env.TWILIO_NUMBER;

var client = twilio(accountSid, authToken);

var twilioClient = {};

// Configure function -------------------------------------------------------------------

twilioClient.configure = function() {

  // Twilio -------------------------------------------------------------------
  var requiredConfig = [accountSid, authToken, sendingNumber];
  var isConfigured = requiredConfig.every(function(configValue) {
    return configValue || false;
  });

  if (!isConfigured) {
    var errorMessage =
      'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';
    throw new Error(errorMessage);
  }

};

twilioClient.getMessageData = function(req) {
  var output = {};
  output.body = req.body.Body;
  output.from = req.body.From;
  return output;
};

twilioClient.sendSms = function(to, message) {
  client.messages.create({
    body: message,
    to: to,
    from: sendingNumber
  }, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log('Message sent:', data.body);
    }
  });
};

twilioClient.rejectCall = function(res) {
  var twiml = new twilio.TwimlResponse();
  twiml.reject();

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};

twilioClient.validate = function(req, options) {
  return twilio.validateExpressRequest(req, authToken, options);
};

module.exports = twilioClient;
