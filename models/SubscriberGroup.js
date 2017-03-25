'use strict';
// User SubscriberGroup model
// Stores groups of subscribers
var mongoose = require('mongoose');

var config = require('../config');

var Subscriber = require('./Subscriber');

var SubscriberGroupSchema = new mongoose.Schema({
	groupName: {
		type:String,
		required: [true, 'Group Name required']
	},
	emailDomain: {
		type: String,
		required: [true, 'Email Domain required']
	},
	signUpSlug: {
		type: String,
		unique: [true, 'Sign Up Slug must be unique'],
		required: [true, 'Sign Up Slug required'],
		match: [/^[a-z\-]+$/, 'Sign Up Slug must be composed of lowercase letters and hyphens.']
	},
	logoSrc: {
		type: String
	},
	subscribers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subscriber'
	}]
});

// findBySlug
// creates a query by signUpSlug and returns a callback function with a potentially-null single document
SubscriberGroupSchema.statics.findBySlug = function(slug, callback) {
	return this.findOne({
		'signUpSlug': slug
	}, function(err, subscriberGroup) { callback(err, subscriberGroup) });
};

SubscriberGroupSchema.statics.findBySlugAndAddSubscriber = function(slug, subscriber, callback) {
	return this.findBySlug(slug, function(err, subscriberGroup) {
		if (err) {
			callback(err);
		} else {
			Subscriber.addNew(subscriber, function(err, subscriber) {
				if (err) {
					callback(err);
				} else {
					subscriberGroup.subscribers.push(subscriber);
					subscriberGroup.save();
					callback(null, subscriberGroup, subscriber);
				}
			});
		}
	});
};

// export
module.exports = mongoose.model('SubscriberGroup', SubscriberGroupSchema);
