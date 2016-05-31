var messageParser = {};

messageParser.getBikeId = function(body) {

  var idRegEx = /^[0-9]+/;

  var matches = body.match(idRegEx);

  return matches? matches[0]: null;

};

module.exports = messageParser;