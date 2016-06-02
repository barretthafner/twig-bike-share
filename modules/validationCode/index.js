var shortid = require("shortid");

var validationCode = {};

validationCode.generate = function () {
  return "$" + shortid.generate();
}

module.exports = validationCode;