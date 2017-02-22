'use strict';
// Subscriber model
// Stores subscriber information
var mongoose = require('mongoose');

var SubscriberSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: [true, 'Email field is required'],
		match: [/.+@.+/, 'Email is not valid']
	},
	phoneNumber: String,
	active: {
		type: Boolean,
		required: [true, 'Active field is required']
	},
	invited: {
		type: Boolean,
		required: [true, 'Invited field is required']
	},
	validationCode: String,
	subscriberGroup: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SubscriberGroup'
	}
});

// emailString
// returns a string formatted for sending an email via a mail service (like MailGun)
SubscriberSchema.methods.emailString = function() {
	return this.firstName + ' ' + this.lastName + ' <' + this.email + '>';
};


// findByPhoneNumber
// creates a query by phone number and returns a callback function with a potentially-null single document
SubscriberSchema.statics.findByPhoneNumber = function(phoneNumber, callback, errback) {
	return this.findOne({
		'phoneNumber': phoneNumber
	}, function(err, subscriber) {
		if (err) {
			errback(err);
		} else {
			callback(subscriber);
		}
	});
};

// findByValidationCode
// creates a query by validation code and returns a callback function with a potentially-null single document
SubscriberSchema.statics.findByValidationCode = function(validationCode, callback, errback) {
	return this.findOne({
		'validationCode': validationCode
	}, function(err, subscriber) {
		if (err) {
			errback(err);
		} else {
			callback(subscriber);
		}
	});
};

// export
module.exports = mongoose.model('Subscriber', SubscriberSchema);
