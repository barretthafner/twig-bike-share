var mongoose = require("mongoose");
var SubscriberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String
});

module.exports = mongoose.model("Subscriber", SubscriberSchema);
