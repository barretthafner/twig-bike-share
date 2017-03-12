'use strict';
// Subscriber model
// Stores subscriber information
var mongoose = require('mongoose');

var validationCode = require('../modules/validationCode');

var SubscriberSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		unique: true,
		required: [true, 'Email field is required'],
		match: [/.+@.+/, 'Email is not valid']
	},
	phoneNumber: String,
	active: {
		type: Boolean,
		required: [true, 'Active field is required']
	},
	validationCode: String
});

// emailString
// returns a string formatted for sending an email via a mail service (like MailGun)
SubscriberSchema.methods.emailString = function() {
	return this.firstName + ' ' + this.lastName + ' <' + this.email + '>';
};


// findByPhoneNumber
// creates a query by phone number and returns a callback function with a potentially-null single document
SubscriberSchema.statics.findByPhoneNumber = function(phoneNumber, callback) {
	return this.findOne({
		'phoneNumber': phoneNumber
	}, function(err, subscriber) { callback(err, subscriber) });
};

// findByValidationCode
// creates a query by validation code and returns a callback function with a potentially-null single document
SubscriberSchema.statics.findByValidationCode = function(validationCode, callback) {
	return this.findOne({
		'validationCode': validationCode
	}, function(err, subscriber) { callback(err, subscriber) });
};

SubscriberSchema.statics.addNew = function(subscriber, callback) {
	subscriber.active = false;
	subscriber.validationCode = validationCode.generate();
	return this.create(subscriber, function(err, subscriber) { callback(err, subscriber) });
}

// export
module.exports = mongoose.model('Subscriber', SubscriberSchema);
