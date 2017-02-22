'use strict';
// User SubscriberGroup model
// Stores groups of subscribers
var mongoose = require('mongoose');

var SubscriberGroupSchema = new mongoose.Schema({
	companyName: {
		type:String,
		required: [true, 'Company Name required']
	},
	emailRegex: {
		type: String,
		required: [true, 'Email Regex required'],
		// match: [/.+@.+/, 'Email is not valid']
	},
	urlString: {
		type: String,
		required: [true, 'Url string required'],
		match: [/^[a-z\-]+$/, 'Only one word composed of lowercase letters and hyphen allowed.']
	},
});

// export
module.exports = mongoose.model('Subscriber', SubscriberSchema);

