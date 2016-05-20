var mongoose = require("mongoose");
var BikeSchema = new mongoose.Schema({
  id: Number,
  code: Number
});

module.exports = mongoose.model("Bike", BikeSchema);
