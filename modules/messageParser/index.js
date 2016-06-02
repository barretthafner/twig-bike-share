var messageParser = {};

messageParser.getBikeId = function(string) {

  var idRegEx = /^[0-9]+/;

  var matches = string.match(idRegEx);

  return matches? matches[0]: null;

};

messageParser.getValidationCode = function(string) {

  var codeRegEx = /^\$[A-Za-z0-9_-]{8}/;

  var matches = string.match(codeRegEx);

  return matches? matches[0]: null;

};

module.exports = messageParser;