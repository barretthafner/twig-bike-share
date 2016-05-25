var config = require('../../config');
// config.accountSid, config.authToken
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var twilioClient = {};

twilioClient.sendSms = function(to, message) {
  client.messages.create({
    body: message,
    to: to,
    from: process.env.TWILIO_NUMBER
    //from: config.sendingNumber
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
      from: process.env.TWILIO_NUMBER
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