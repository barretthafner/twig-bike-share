'use strict';
var express = require('express');
var router = express.Router();

var stringify = require('csv-stringify');

var Checkout = require('../../models/Checkout');
var Subscriber = require('../../models/Subscriber');
var Message = require('../../models/Message');
var routes = require('../../config').routes;
var supportTimeZone = require('../../config').supportTimeZone;
var moment = require('moment');
var Promise = require('bluebird');


// Data index route
router.get('/', function(req, res) {
	var now = moment();

	Checkout.listWithin30DaysOf(now, function(err, checkoutList) {
		if (err) console.log('Error finding checkouts: ' + err);

		// console.log(checkoutList);

		res.render('admin/data/index', {
			checkoutList: checkoutList
		});
	});
});

// Download bike checkouts route
router.get(routes.checkouts, function(req, res) {
	Checkout.find({}, function(err, checkouts) {
		if (err) {
			req.flash('error', err.message);
			res.redirect(routes.data);
		} else {
			var data = checkouts.map(function(checkout) {
				return {
					Timestamp: (new Date(checkout.timestamp)).toLocaleString('en-US', { timeZone: supportTimeZone }),
					BikeId: checkout.bike ? checkout.bike : 'Unknown',
					SubscriberId: checkout.subscriber ? checkout.subscriber : 'Unknown',
					LocationCode: checkout.location ? checkout.location : 'Unknown'
				};
			});
			stringify(data, { header: true }, function(err, output) {
				if (err) {
					req.flash('error', err.message);
					res.redirect(routes.data);
				} else {
					res.attachment('checkouts_' + Date.now() + '.csv');
					res.status(200).send(output);
				}
			});
		}
	});
});

// Download data route
router.get(routes.subscriberEmailData, function(req, res) {
	Subscriber.find({})
		.populate('subscriberGroup', 'groupName')
		.exec(function(err, subscribers) {
			if (err) {
				req.flash('error', err.message);
				res.redirect(routes.data);
			} else {
				var data = subscribers.map(function(subscriber) {
					return {
						SubscriberId: subscriber.id,
						SubscriberEmail: subscriber.email,
						GroupName: subscriber.subscriberGroup.groupName,
						Active: subscriber.active,
						SignedUpDate: (new Date(subscriber.signedUpDate)).toLocaleString('en-US', { timeZone: supportTimeZone })
					};
				});
				stringify(data, { header: true }, function(err, output) {
					if (err) {
						req.flash('error', err.message);
						res.redirect(routes.data);
					} else {
						res.attachment('subscriberEmails_' + Date.now() + '.csv');
						res.status(200).send(output);
					}
				});
			}
		});
});

// Download messages route
router.get(routes.messages, function(req, res) {
	Message.find({}, function(err, messages) {
		if (err) {
			req.flash('error', err.message);
			res.redirect(routes.data);
		} else {
			var data = [];

			var promises = messages.map(function(message) {
				return Subscriber.findByPhoneNumber(message.from, function(err, subscriber) {
					if (err) {
						req.flash('error', err.message);
						res.redirect(routes.data);
					} else {
						data.push({
							Timestamp: (new Date(message.timestamp)).toLocaleString('en-US', { timeZone: supportTimeZone }),
							From: subscriber ? subscriber.id : 'Unknown',
							Body: message.body,
							Response: message.response
						});
					}
				});
			});

			Promise.all(promises).then(function() {
				stringify(data, { header: true }, function(err, output) {
					if (err) {
						req.flash('error', err.message);
						res.redirect(routes.data);
					} else {
						res.attachment('messages_' + Date.now() + '.csv');
						res.status(200).send(output);
					}
				});
			});
		}
	});
});


module.exports = router;
