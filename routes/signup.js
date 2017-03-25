'use strict';
var express = require('express');
var router = express.Router();
var SubscriberGroup = require('../models/SubscriberGroup');
var Subscriber = require('../models/Subscriber');
var routes = require('../config').routes;
var twilioSendingNumber = require('../config').twilioSendingNumber;
var siteTitle = require('../config').siteTitle;
var supportSite = require('../config').supportSite;
var mailer = require('../modules/mailgun');
var fs = require('fs');
var path = require('path');

var emailCopy = fs.readFileSync(path.resolve(__dirname, '../email.html'), 'utf8');


router.get('/:group_slug', function(req, res) {
	SubscriberGroup.findBySlug(req.params.group_slug, function(err, subscriberGroup) {
		if (err) {
			req.flash('error', 'Server error finding your sign up page: ' + err.message);
			res.redirect(routes.root);
		} else {
			res.render('signup/index', {
				subscriberGroup: subscriberGroup
			});
		}
	});
});

router.post('/:group_slug', function(req, res) {
	SubscriberGroup.findBySlugAndAddSubscriber(req.params.group_slug, req.body.subscriber, function(err, subscriberGroup, subscriber) {
		if (err) {
			req.flash('error', 'Server error adding subscriber: ' + err.message);
			res.redirect('back');
		} else {

			var email = emailCopy.slice();
			email = email.replace(/___SITE_TITLE___/g, siteTitle);
			email = email.replace(/___VALIDATION_CODE___/g, subscriber.validationCode);
			email = email.replace(/___SENDING_NUMBER___/g, twilioSendingNumber);
			email = email.replace(/___SUPPORT_ADDRESS___/g, supportSite);

			mailer.sendOne({
				to: subscriber.email,
				subject: 'Welcome to the ' + siteTitle,
				html: email
			});

			res.render('signup/thank-you', {
				subscriberGroup: subscriberGroup,
				subscriber: subscriber
			});

		}
	})
});

module.exports = router;
