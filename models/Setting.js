var mongoose = require("mongoose");
var SettingSchema = new mongoose.Schema({
  key: String,
  value: String
});

SettingSchema.statics.findByKey = function (key, callback) {
  return this.findOne({ 'key': key }, function (err, setting) {
      callback(err, setting);
  });
};

SettingSchema.statics.findByKeyAndUpdate = function (key, value, callback) {
  return this.findOne({ 'key': key }, function (err, setting) {
    setting.value = value;
    setting.save();
    callback(err, setting);
  });
};

module.exports = mongoose.model("Setting", SettingSchema);