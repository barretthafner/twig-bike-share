'use strict';
// regExp parser
// helper module for parsing different types of messagess
var parser = {};

// regEx for finding a bikeID
var bikeIdRegEx = /^[0-9]+/;
// regEx for finding a validation code
var validationRegEx = /^\s*\$[A-Za-z0-9_-]{9}/;

// getBikeId
parser.getBikeId = function(string) {

	var matches = string.match(bikeIdRegEx);
	return matches ? matches[0] : null;
};

// getValidationCode
parser.getValidationCode = function(string) {

	var matches = string.match(validationRegEx);
	return matches ? matches[0] : null;
};

// export
module.exports = parser;
