'use strict';
// twilio messaging module
// twilio is a great low-cost text-messaging api, see more on www.twilio.com
var twilio = require('twilio');

// require config for environment variables
var config = require('../../config');
var routes = config.routes;

// set config variables
var accountSid = config.twilioAccountSid;
var authToken = config.twilioAuthToken;
var sendingNumber = config.twilioSendingNumber;

// start twilio client
var client = twilio(accountSid, authToken);

// create messenger object
var messenger = {};

// getMessageData
// returns the body and sending number of a text message received from twilio
messenger.getMessageData = function(req) {
	var output = {};
	output.body = req.body.Body;
	output.from = req.body.From;
	console.log('Message recieved from: ' + output.from + ' It says: ' + output.body);
	return output;
};

// sendSms
// send a sms through the twilio client
// requires a 'to' string and a 'message' string
messenger.sendSms = function(to, message) {
	client.messages.create({
		body: message,
		to: to,
		from: sendingNumber
	}, function(err, data) {
		if (err) {
			console.error(err);
		} else {
			console.log('Message sent:', data.body);
		}
	});
};

// twimlResponse
// creates a twiml formated response
messenger.smsResponse = function(response) {
	var twiml = new twilio.twiml.MessagingResponse();
	return twiml.message(response).toString();
};

// rejectCall
// takes the res object from express and rejects a call through the twilio client
messenger.rejectCall = function(res) {
	var twiml = new twilio.TwimlResponse();
	twiml.reject();

	res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
	res.end(twiml.toString());
};

// validate
// takes the req object from express and validates it using our auth token
// returns true if valid
messenger.validate = function(req) {
	return twilio.validateExpressRequest(req, authToken, {
		url: config.protocol + config.appDomain + routes.twilioApi + routes.twilioApiIncomingMessage
	});
};

messenger.setEndpoints = function() {
	client.incomingPhoneNumbers.list(function(err, data) {
		var sid;
		data.incomingPhoneNumbers.forEach(function(number) {
			if(number.phoneNumber === sendingNumber) {
				sid = number.sid;
			}
		});

		client.incomingPhoneNumbers.get(sid).update({
			voiceUrl: config.protocol + config.appDomain + routes.twilioApi + routes.twilioApiIncomingVoice,
			voiceMethod: 'POST',
			smsUrl: config.protocol + config.appDomain + routes.twilioApi + routes.twilioApiIncomingMessage,
			smsMethod: 'POST'
		}, function(err) {
			if (err) {
				console.error(err);
			} else {
				console.log('Twilio endpoints set!');
			}
		});
	});
};

// export
module.exports = messenger;
