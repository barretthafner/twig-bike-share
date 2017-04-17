'use strict';
// Location model
// Stores bike locations
var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
	code: {
		type: String,
		required: [true, 'Location Code is required'],
		unique: [true, 'Location Code must be unique'],
		uppercase: [true, 'Location Code must be uppercase'],
		minlength: [2, 'Location Code must be exactly 2 letters'],
		maxlength: [2, 'Location Code must be exactly 2 letters']
	},
	name: {
		type: String,
		required: [true, 'Location Name is required']
	}
});

// export
module.exports = mongoose.model('Location', LocationSchema);
