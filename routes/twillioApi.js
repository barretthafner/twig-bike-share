'use strict';
// api routes
// contains routes for sending an receiving text messages from the messaging client
// contains most of the logic that allows a subscriber to activate their account and use the system

var express = require('express'),
	router = express.Router(),
	middleware = require('../middleware'),
	regEx = require('../modules/regExParser'),
	client = require('../modules/twilio'),
	middleware = require('../middleware');

var Subscriber = require('../models/Subscriber'),
	Bike = require('../models/Bike');


// incoming voice route
// rejects all voice calls
router.post('/voice/incoming', function(req, res) {
	client.rejectCall(res);
	console.log('Call Rejected!');
});

// incoming sms route
// this does a number of check to see if the sms is valid
router.post('/messaging/incoming', function(req, res) {

	// validate the http request is from twilio
	if (client.validate(req)) {

		// get message data from request body
		var message = client.getMessageData(req);
		// compare body to bike id parser and validation code parser
		var bikeId = regEx.getBikeId(message.body);
		var validationCode = regEx.getValidationCode(message.body);

		// look up subscriber by phone number
		Subscriber.findByPhoneNumber(message.from, function(subscriber) {

			// if the query returns a valid subscriber and the account is active, look for bike id
			if (subscriber && subscriber.active) {
				if (bikeId) {
					Bike.findByBikeId(bikeId, function(bike) {
						if (bike) {
							client.sendSms(subscriber.phoneNumber, 'The code for bike number ' + bike.bikeId + ' is: ' + bike.code);
						} else {
							client.sendSms(subscriber.phoneNumber, 'Sorry, we couldn\'t find a bike with ID: ' + bikeId);
						}
					});
				} else {
					client.sendSms(subscriber.phoneNumber, 'Sorry, we could not understand your request. Please send bike ID number only.')
				}
				console.log(subscriber.firstName + ' sent a message! It says: ' + message.body);
			} else if (subscriber && !subscriber.active) {
				client.sendSms(subscriber.phoneNumber, 'Sorry, your number has been deactivated.');
			} else if (validationCode) {
				Subscriber.findByValidationCode(validationCode, function(subscriber) {
					if (subscriber) {
						subscriber.phoneNumber = message.from;
						subscriber.active = true;
						subscriber.validationCode = '';
						subscriber.save();
						client.sendSms(subscriber.phoneNumber, 'Welcome to the Open Bike Project. Your number is now active.');
					} else {
						client.sendSms(message.from, 'Sorry you are not authorized to use this application.');
					}
				});
			} else {
				client.sendSms(message.from, 'Sorry you are not authorized to use this application. Validation Error');
			}
		});

		res.status(200).send();
	} else {
		// if not from twilio reject request
		res.status(403).send('Authorization Required!');
	}
});

module.exports = router;
