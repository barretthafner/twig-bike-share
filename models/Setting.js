var mongoose = require("mongoose");

var SettingSchema = new mongoose.Schema({
  key: String,
  value: String
});

SettingSchema.statics.getSetting = function (params) {
  var key = params.key;
  var clean = params.cleanData;

   this.findOne({ 'key': key }, function (err, setting) {
    if (err) {
      console.log(err);
    } else {
      if (clean) {
        setting = cleanSetting(setting);
      }
      return setting.value;
    }
  });
};


SettingSchema.statics.getAllSettings = function (clean, callback) {
  this.find({}, function(err, settings){
    if (err) {
      console.log(err);
    } else {
      if (clean) {
        settings.forEach(function (setting) {
          setting = cleanSetting(setting);
        });
      }
      callback(settings);
    }
  });
};

SettingSchema.statics.getSettingById = function (params, callback) {
  var key = params.key;
  var clean = params.cleanData;

  this.findOne({ 'key': key }, function (err, setting) {
    if (err) {
      console.log(err);
    } else {
      if (clean) {
        setting = cleanSetting(setting);
      }
      callback(setting);
    }
  });
};

var cleanSetting = function (setting) {
  if (setting.key.match(/^\$/)) {
    setting.value = "..." + setting.value.slice(-5);
  }
  return setting;
};

module.exports = mongoose.model("Setting", SettingSchema);