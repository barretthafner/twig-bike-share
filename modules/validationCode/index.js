// validationCode module
// generates "unique" validation codes with shortid library
var shortid = require("shortid");

var validationCode = {};

// generate
// returns a new validation code
validationCode.generate = function () {
  return "$" + shortid.generate();
}

// export
module.exports = validationCode;