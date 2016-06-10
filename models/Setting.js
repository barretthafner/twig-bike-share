var mongoose = require("mongoose");
var SettingSchema = new mongoose.Schema({
  key: String,
  value: String
});

SettingSchema.statics.getByKey = function (key, callback) {
  return this.findOne({ 'key': key }, function (err, setting) {
      callback(err, setting);
  });
};

module.exports = mongoose.model("Setting", SettingSchema);