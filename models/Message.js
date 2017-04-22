'use strict';
// Message model
// Stores recieved messages
var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	from: String,
	body: String,
	response: String,
	timestamp: {
		type: Date,
		default: Date.now
	}
});

// export
module.exports = mongoose.model('Message', MessageSchema);
