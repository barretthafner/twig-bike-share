var api_key = process.env.MAILGUN_APIKEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


var mailer = {};

mailer.sendOne = function(params, callback) {

  // var params = {
  //   from: "Barrett Hafner <barretth@gmail.com>",
  //   to: "Barrett Hafner <barrett@hafnerindustries.com>",
  //   subject: "Test Plain Mailgum email w/ HTML",
  //   text: "This is the body text",
  //   html: "<p> This is the html text </p>"
  // };


  mailgun.messages().send(params, function (err, body) {
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