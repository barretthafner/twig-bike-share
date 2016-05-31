var mongoose = require("mongoose");
var SubscriberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String
});

SubscriberSchema.statics.findByPhoneNumber = function(phoneNumber, callback){
  return this.findOne({ 'phoneNumber': phoneNumber }, function (err, subscriber) {
    if (err) {
      console.log(err);
    } else {
      callback(subscriber);
    }
  });
};

module.exports = mongoose.model("Subscriber", SubscriberSchema);

