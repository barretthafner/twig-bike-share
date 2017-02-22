'use strict';
// User SubscriberGroup model
// Stores groups of subscribers
var mongoose = require('mongoose');

var SubscriberGroupSchema = new mongoose.Schema({
	groupName: {
		type:String,
		required: [true, 'Group Name required']
	},
	emailDomain: {
		type: String,
		required: [true, 'Email Domain required']
	},
	inviteUrl: {
		type: String,
		required: [true, 'inviteUrl required'],
		match: [/^[a-z\-]+$/, 'Only one word composed of lowercase letters and hyphen allowed.']
	},
	subscribers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subscriber'
	}],
	settings: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Setting'
	}]
});

// export
module.exports = mongoose.model('SubscriberGroup', SubscriberGroupSchema);

