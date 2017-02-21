'use strict';
// Admin model
// Stores Admins that may log into the app
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var AdminSchema = new mongoose.Schema({
	name: {
		type: String
	},
	username: {
		type: String,
		required: [true, 'Email field is required']
	}
});

// plugin passport local for auth
AdminSchema.plugin(passportLocalMongoose);

// export
module.exports = mongoose.model('Admin', AdminSchema)
