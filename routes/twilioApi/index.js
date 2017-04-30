'use strict';
// api routes
// contains routes for sending an receiving text messages from the messaging client
// contains most of the logic that allows a subscriber to activate their account and use the system

var express = require('express');
var router = express.Router();
var middleware = require('../../middleware');
var regEx = require('../../modules/regExParser');
var twilio = require('../../modules/twilio');
var presurvey = require('../../modules/presurvey');

var Subscriber = require('../../models/Subscriber');
var Bike = require('../../models/Bike');
var Checkout = require('../../models/Checkout');
var Location = require('../../models/Location');
var Message = require('../../models/Message');

var routes = require('../../config').routes;
var siteTitle = require('../../config').siteTitle;
var supportSite = require('../../config').supportSite;
var supportEmail = require('../../config').supportEmail;


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

		var response = '';
		var sendResponse = responseFactory(message.from, message.body, res);

		// look up subscriber by phone number
		var promise = Subscriber.findByPhoneNumber(message.from, function(err, subscriber) {

			// if the query returns a valid subscriber and the account is active, look for bike id
			if (subscriber && subscriber.active) {
				// REPAIR REQUEST --------------------------------------------------------------------------
				if (bikeToRepair) {
					Bike.findByBikeId(bikeToRepair, function(err, bike) {
						if (bike) {
							if (repairMessage) {
								bike.addRepairRequest(subscriber, repairMessage);
								response += 'Thank you. A service request has been submitted for bike number ' + bike.bikeId + '.';
							} else {
								response += 'A message with bike location and the service needs is required to submit a repair request. Please send your request again with a message. Example:\n\'repair 12 KP flat tire\'';
							}
						} else {
							response += 'Sorry, we couldn\'t find a bike with ID: ' + bikeToRepair + ' to request service.';
						}
						sendResponse(response);
					});
				// BIKE CHECKOUT --------------------------------------------------------------------------
				} else if (bikeToCheckout) {
					Bike.findByBikeId(bikeToCheckout, function(err, bike) {
						if (bike && bike.active) {
							if (bike.repairRequests.length > 0) {
								response += 'Alert! A repair request has been made for this bike. Use with caution.\n';
							}
							response += 'The code for bike number ' + bike.bikeId + ' is: ' + bike.code;
							Location.findByLocationCode(bikeCheckoutLocation, function(err, location) {
								if (location) {
									response += '\nYou checked it out from: ' + location.name;
								}
								Checkout.addNew(subscriber, bike, location, function(err, checkout) {
									if (err) {
										console.error('Creating a new checkout failed!');
									} else {
										console.log('User ' + checkout.subscriber.email + ' just checked out bike # ' + checkout.bike.bikeId + ' at ' + checkout.timestamp + ' from ' + (checkout.location ? checkout.location.name : 'an unknown location'));
									}
								});
								sendResponse(response);
							});
						} else if (bike && !bike.active) {
							response += 'Sorry, bike number ' + bike.bikeId + ' has been flagged for repairs and been deactivated. Contact ' + supportEmail + ' for support.';
							sendResponse(response);
						} else {
							response += 'Sorry, we couldn\'t find a bike with ID: ' + bikeToCheckout;
							sendResponse(response);
						}
					});
				} else {
					response += 'Sorry, we could not understand your request. Please refer to ' + supportSite + ' for usage instructions.';
					sendResponse(response);
				}
			} else if (subscriber && !subscriber.active) {
				response += 'Sorry, your number has been deactivated.';
				sendResponse(response);
			// VALIDATION CODE --------------------------------------------------------------------------
			} else if (validationCode) {
				Subscriber.findByValidationCode(validationCode, function(err, subscriber) {
					if (subscriber) {
						subscriber.phoneNumber = message.from;
						subscriber.active = true;
						subscriber.validationCode = '';
						subscriber.save();
						response += 'Welcome to the ' + siteTitle + ' ' + subscriber.firstName + '. Your number is now active.';
						// presurvey.send(subscriber.email);
					} else {
						response += 'Sorry you are not authorized to use this application.';
					}
					sendResponse(response);
				});
			} else {
				response += 'Sorry you are not authorized to use this application.';
				sendResponse(response);
			}
		});
	} else {
		// if not from twilio reject request
		res.status(403).send('Authorization Required!');
	}
});

function responseFactory(from, body, res) {
	return function(response) {
		res.writeHead(200, {'Content-Type': 'text/xml'});
		res.end(twilio.twimlResponse(response));
		console.log('Message sent:', response);
		Message.create({
			from: from,
			body: body,
			response: response
		});
	}
}

module.exports = router;
