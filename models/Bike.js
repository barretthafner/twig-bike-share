var mongoose = require("mongoose");
var BikeSchema = new mongoose.Schema({
  bikeId: Number,
  bikeCode: Number
});

module.exports = mongoose.model("Bike", BikeSchema);
