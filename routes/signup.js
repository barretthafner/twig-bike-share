'use strict';
var express = require('express');
var router = express.Router();
var SubscriberGroup = require('../models/SubscriberGroup');
var Subscriber = require('../models/Subscriber');
var routes = require('../config').routes;
var mailer = require('../modules/mailgun');


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

			mailer.sendOne({
				to: subscriber.email,
				subject: 'Welcome!',
				text: 'Test!',
				html: '<h1>Test!</h1>'
			});

			res.render('signup/thank-you', {
				subscriberGroup: subscriberGroup,
				subscriber: subscriber
			});

		}
	})
});

module.exports = router;
