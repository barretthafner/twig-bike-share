var api_key = process.env.MAILGUN_APIKEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var mailer = {};

mailer.sendTest = function() {
  var data1 = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'barretth@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };

  mailgun.messages().send(data1, function (err, body) {
    if (err) {
      console.log(err);
    } else {
      console.log("mail sent!");
    }
  });


};

module.exports = mailer;