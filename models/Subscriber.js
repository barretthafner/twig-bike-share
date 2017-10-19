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
	validationCode: String,
	subscriberGroup: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SubscriberGroup'
	},
	signedUpDate: {
		type: Date,
		default: Date.now
	}
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
	}).populate('subscriberGroup').exec(function(err, subscriber) { callback(err, subscriber); });
};

// findByValidationCode
// creates a query by validation code and returns a callback function with a potentially-null single document
SubscriberSchema.statics.findByValidationCode = function(validationCode, callback) {
	return this.findOne({
		'validationCode': validationCode
	}).populate('subscriberGroup').exec(function(err, subscriber) { callback(err, subscriber); });
};

// addNew
// add new subscriber and make inactive and generate validation code
SubscriberSchema.statics.addNew = function(subscriber, subscriberGroup, callback) {
	subscriber.active = false;
	subscriber.validationCode = validationCode.generate();
	subscriber.subscriberGroup = subscriberGroup;
	return this.create(subscriber, function(err, subscriber) { callback(err, subscriber); });
};

SubscriberSchema.pre('remove', function(next) {
	var subscriber = this;
	subscriber.model('SubscriberGroup').update(
		{ _id: subscriber.subscriberGroup },
		{ $pull: { subscribers: subscriber._id } },
		{ multi: true },
		next
	);
});

// export
module.exports = mongoose.model('Subscriber', SubscriberSchema);
