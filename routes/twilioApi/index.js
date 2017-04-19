'use strict';
// api routes
// contains routes for sending an receiving text messages from the messaging client
// contains most of the logic that allows a subscriber to activate their account and use the system

var express = require('express');
var router = express.Router();
var middleware = require('../../middleware');
var regEx = require('../../modules/regExParser');
var twilio = require('../../modules/twilio');

var Subscriber = require('../../models/Subscriber');
var Bike = require('../../models/Bike');
var Checkout = require('../../models/Checkout');
var Location = require('../../models/Location');

var routes = require('../../config').routes;
var siteTitle = require('../../config').siteTitle;
var supportSite = require('../../config').supportSite;


// incoming voice route
// rejects all voice calls
router.post(routes.twilioApiIncomingVoice, function(req, res) {
	twilio.rejectCall(res);
	console.log('Call Rejected!');
});

// incoming sms route
// this does a number of check to see if the sms is valid
router.post(routes.twilioApiIncomingMessage, function(req, res) {

	// validate the http request is from twilio
	if (twilio.validate(req)) {

		// get message data from request body
		var message = twilio.getMessageData(req);

		// compare body regEx parsers
		var bikeToRepair = regEx.getBikeIdFromRepairRequest(message.body);
		var repairMessage = regEx.getMessageFromRepairRequest(message.body);
		var bikeToCheckout = regEx.getBikeIdFromCheckout(message.body);
		var bikeCheckoutLocation = regEx.getLocationFromCheckout(message.body);
		var validationCode = regEx.getValidationCode(message.body);

		// look up subscriber by phone number
		Subscriber.findByPhoneNumber(message.from, function(err, subscriber) {

			// if the query returns a valid subscriber and the account is active, look for bike id
			if (subscriber && subscriber.active) {
				// REPAIR REQUEST --------------------------------------------------------------------------
				if (bikeToRepair) {
					Bike.findByBikeId(bikeToRepair, function(err, bike) {
						if (bike) {
							bike.addRepairRequest(subscriber, repairMessage);
							var composedMessage = 'Thank you. A service request has been submitted for bike number ' + bike.bikeId + '.';
							if (repairMessage) {
								composedMessage = composedMessage + ' Repair message: ' + repairMessage;
							}
							twilio.sendSms(subscriber.phoneNumber, composedMessage);
						} else {
							twilio.sendSms(subscriber.phoneNumber, 'Sorry, we couldn\'t find a bike with ID: ' + bikeToRepair + ' to request service.');
						}
					});
				// BIKE CHECKOUT --------------------------------------------------------------------------
				} else if (bikeToCheckout) {
					Bike.findByBikeId(bikeToCheckout, function(err, bike) {
						if (bike) {
							console.log(bikeCheckoutLocation);
							Location.findByLocationCode(bikeCheckoutLocation, function(err, location) {
								if (location) {
									twilio.sendSms(subscriber.phoneNumber, 'The code for bike number ' + bike.bikeId + ' is: ' + bike.code + '\nYou checked it out from: ' + location.name);
								} else {
									twilio.sendSms(subscriber.phoneNumber, 'The code for bike number ' + bike.bikeId + ' is: ' + bike.code);
								}
								Checkout.addNew(subscriber, bike, location, function(err, checkout) {
									if (err) {
										console.error('Creating a new checkout failed!');
									} else {
										console.log('User ' + checkout.subscriber.email + ' just checked out bike #' + checkout.bike.bikeId + ' at ' + checkout.timestamp + ' from ' + (checkout.location ? checkout.location.name : 'an unknown location'));
									}
								});
							});
						} else {
							twilio.sendSms(subscriber.phoneNumber, 'Sorry, we couldn\'t find a bike with ID: ' + bikeToCheckout);
						}
					});
				} else {
					twilio.sendSms(subscriber.phoneNumber, 'Sorry, we could not understand your request. Please refer to ' + supportSite + ' for usage instructions.')
				}
			} else if (subscriber && !subscriber.active) {
				twilio.sendSms(subscriber.phoneNumber, 'Sorry, your number has been deactivated.');
			// VALIDATION CODE --------------------------------------------------------------------------
			} else if (validationCode) {
				Subscriber.findByValidationCode(validationCode, function(err, subscriber) {
					if (subscriber) {
						subscriber.phoneNumber = message.from;
						subscriber.active = true;
						subscriber.validationCode = '';
						subscriber.save();
						twilio.sendSms(subscriber.phoneNumber, 'Welcome to the ' + siteTitle + ' ' + subscriber.firstName + '. Your number is now active.');
					} else {
						twilio.sendSms(message.from, 'Sorry you are not authorized to use this application.');
					}
				});
			} else {
				twilio.sendSms(message.from, 'Sorry you are not authorized to use this application.');
			}
		});

		res.status(200).send();
	} else {
		// if not from twilio reject request
		res.status(403).send('Authorization Required!');
	}
});

module.exports = router;
