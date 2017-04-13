'use strict';
// validationCode module
// generates 'unique' validation codes with shortid library
var shortid = require('shortid');

shortid.characters('0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ-_*&');

var validationCode = {};

// generate
// returns a new validation code
validationCode.generate = function() {
	return '$' + shortid.generate();
}

// export
module.exports = validationCode;
