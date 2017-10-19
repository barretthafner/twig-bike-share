'use strict';
// Administrator model
// Stores Administrators that may log into the app
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var AdministratorSchema = new mongoose.Schema({
	name: {
		type: String
	},
	username: {
		type: String,
		required: [true, 'Email field is required']
	}
});

// plugin passport local for auth
AdministratorSchema.plugin(passportLocalMongoose);

// export
module.exports = mongoose.model('Administrator', AdministratorSchema);
