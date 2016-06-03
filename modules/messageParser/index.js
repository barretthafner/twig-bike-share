var messageParser = {};

var idRegEx = /^[0-9]+/;
var codeRegEx = /^\$[A-Za-z0-9_-]{8}/;

messageParser.getBikeId = function(string) {

  var matches = string.match(idRegEx);
  return matches? matches[0]: null;
};

messageParser.getValidationCode = function(string) {

  var matches = string.match(codeRegEx);
  return matches? matches[0]: null;
};

module.exports = messageParser;