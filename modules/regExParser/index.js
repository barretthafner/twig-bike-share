var parser = {};

var bikeIdRegEx = /^[0-9]+/;
var validationRegEx = /^\$[A-Za-z0-9_-]{8}/;

parser.getBikeId = function(string) {

  var matches = string.match(bikeIdRegEx);
  return matches? matches[0]: null;
};

parser.getValidationCode = function(string) {

  var matches = string.match(validationRegEx);
  return matches? matches[0]: null;
};

module.exports = parser;