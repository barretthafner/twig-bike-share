var api_key = process.env.MAILGUN_APIKEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var mailcomposer = require('mailcomposer');


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


  var mail = mailcomposer({
    from: 'you@samples.mailgun.org',
    to: 'mm@samples.mailgun.org',
    subject: 'Test email subject',
    body: 'Test email text',
    html: '<b> Test email text </b>'
  });

  mail.build(function(mailBuildError, message) {

    var dataToSend = {
      to: 'mm@samples.mailgun.org',
      message: message.toString('ascii')
    };

    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
      if (sendError) {
        console.log(sendError);
        return;
      }
    });
  });



};

module.exports = mailer;