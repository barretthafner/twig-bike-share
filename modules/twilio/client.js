var config = require('./config');
var accountSid = config.accountSid;
var authToken  = config.authToken;
var sendingNumber = config.sendingNumber;

var client = require('twilio')(accountSid, authToken);

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
    from: process.env.TWILIO_NUMBER //sendingNumber
    // mediaUrl: 'http://www.yourserver.com/someimage.png'
  }, function(err, data) {
    if (err) {
      console.error('Could not notify administrator');
      console.error(err);
    } else {
      console.log('Administrator notified');
    }
  });
};

twilioClient.makeCall = function (to) {

  client.makeCall({
      to: to,
      from: sendingNumber
      // url: url
  }, function(err, message) {
      console.log(err);
      if (err) {
        console.error('Could not notify administrator');
        console.error(err);
      } else {
        console.log('Administrator notified');
      }
  });
}

module.exports = twilioClient;
