var mongoose = require("mongoose");
var SettingSchema = new mongoose.Schema({
  key: String,
  value: String
});

SettingSchema.statics.getSettingbyKey = function (key, callback) {
  return this.findOne({ 'key': key }, function (err, setting) {
    if (err) {
      console.log(err);
    } else {
      callback(setting);
    }
  });
};

module.exports = mongoose.model("Setting", SettingSchema);