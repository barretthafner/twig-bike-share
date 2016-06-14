// mailgun messaging module
// requires account from www.mailgun.com
// Free email service for up to 400 messages a day

// require config for environment variables
var config = require("../../config");

// set config variables
var api_key = config.mailgunApiKey;
var domain = config.mailgunDomain;
var fromEmail = config.mailgunFromEmail;

// initialize mailgun service
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

// create messaging module export object
var mailer = {};

// sendOne
// sends one email, requires paramater object :
// params = {
//   to: "Blah blah <blah@blah.net>",
//   subject: "Blah dee blah",
//   text: "Blah deedee blah",
//   html: "<h1>Blah deedee blah</h1>"
// };
mailer.sendOne = function(params, callback) {

  var data = {
    from: fromEmail,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html
  };

  // send message; if there is a callback let it handle the err, else handle err
  mailgun.messages().send(data, function (err) {
    if (callback) {
      callback(err);
    } else if (err) {
      console.log(err);
    } else {
      console.log('email sent!');
    }
  });
};

// export
module.exports = mailer;