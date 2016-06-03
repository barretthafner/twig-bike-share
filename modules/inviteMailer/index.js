var nodemailer = require("nodemailer");

var inviteMailer = {};

inviteMailer.sendInvite = function (email, validationCode) {
  var transporter = nodemailer.createTransport('smtps');
};

module.exports = inviteMailer;