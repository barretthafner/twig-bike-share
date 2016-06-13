// Bike model
// Has a two-digit bike ID and a 4 digit unlock code for a tumbler U-lock bike lock

// Need to add user feedback for this validation, also does not seem to be working properly on 6/13
var mongoose = require("mongoose");
var BikeSchema = new mongoose.Schema({
  bikeId: {
    type: Number,
    required: [true, 'Bike ID required'],
    min: [10, 'Bike ID must be two digits'],
    max: [99, 'Bike ID must be two digits'],
    unique: [true, 'Bike ID must be unique']
  },
  code: {
    type: String,
    required: [true, 'Bike code is required'],
    match: [/\d{4}/, "Code must be a 4-digit number."]
  }
});

// findByBikeID
// creates a query by bikeId, and returns a callback function with the results
// bikeId's are unique, this should return only one result
BikeSchema.statics.findByBikeId = function (bikeId, callback) {
  return this.findOne({ 'bikeId': bikeId }, function (err, bike) {
    if (err) {
      console.log(err);
    } else {
      callback(bike);
    }
  });
};

module.exports = mongoose.model("Bike", BikeSchema);
