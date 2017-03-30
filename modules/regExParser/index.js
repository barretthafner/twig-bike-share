'use strict';
// regExp parser
// helper module for parsing different types of messagess
var parser = {};

// getBikeId
// regEx for finding a bikeID
parser.getBikeId = function(string) {

	var matches = string.match(   /^\s*[0-9]+/   );
	return matches ? matches[0] : null;
};

// getValidationCode
// regEx for finding a validation code
parser.getValidationCode = function(string) {


	var matches = string.match(   /\$[A-Za-z0-9_-]{9}/   );
	return matches ? matches[0] : null;
};

// getBikeIdFromRepairRequest
// regEx for getting repair requests
parser.getBikeIdFromRepairRequest = function(string) {

	var matches = string.match(   /repair\s*([0-9]+)\s*(.*)/i   );
	return matches ? matches[1] : null;
};

// getMessageFromRepairRequest
// regEx for getting repair requests
parser.getMessageFromRepairRequest = function(string) {

	var matches = string.match(   /repair\s*([0-9]+)\s*(.*)/i   );
	return matches ? matches[2] : null;
};


// export
module.exports = parser;
