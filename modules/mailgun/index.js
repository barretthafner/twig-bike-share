var config = require("../../config");
var api_key = config.mailgunApiKey;
var domain = config.mailgunDomain;
var fromEmail = config.mailgunFromEmail;

var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var mailer = {};

mailer.sendOne = function(params, callback) {

  var data = {
    from: fromEmail,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html
  };

  mailgun.messages().send(data, function (err, body) {
    if (callback) {
      console.log(body);
      callback(err);
    } else if (err) {
      console.log(err);
    } else {
      console.log(body);
    }
  });
};
module.exports = mailer;