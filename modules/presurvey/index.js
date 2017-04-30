'use strict';
// presurvey module

var fs = require('fs');
var path = require('path');
var mailer = require('../mailgun');

var siteTitle = require('../../config').siteTitle;

var emailCopy = fs.readFileSync(path.resolve(__dirname, './pre-survey.html'), 'utf8');

// create messaging module export object
var presurvey = {};

// send
// send the presurvey to provided email
presurvey.send = function(toEmail) {
	mailer.sendOne({
		to: toEmail,
		subject: siteTitle + ' Presurvey',
		html: emailCopy
	});
};

// export
module.exports = presurvey;
