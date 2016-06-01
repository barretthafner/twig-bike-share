var config = require('./config');
var middleware = require('./middleware')
var accountSid = config.accountSid;
var authToken  = config.authToken;
var sendingNumber = config.sendingNumber;

var twilio = require('twilio')
var client = twilio(accountSid, authToken);

var twilioClient = {};

twilioClient.getData = function(req) {
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
      console.error('Could not notify administrator');
      console.error(err);
    } else {
      console.log('Administrator notified');
    }
  });
};

twilioClient.rejectCall = function(res) {
  var twiml = new twilio.TwimlResponse();
  twiml.reject();

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};

module.exports = twilioClient;
