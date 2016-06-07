var mongoose = require("mongoose");

var SettingSchema = new mongoose.Schema({
  key: String,
  value: String,
  clean: Boolean
});

SettingSchema.statics.getSettingByKey = function (params, callback) {

   this.findOne({ 'key': params.key }, function (err, setting) {
    if (err) {
      console.log(err);
    } else {
      if (params.clean) {
        setting = cleanSetting(setting);
      }
      callback(setting);
    }
  });
};


SettingSchema.statics.getAllSettings = function (params, callback) {

  this.find({}, function(err, settings){
    if (err) {
      console.log(err);
    } else {
      if (params.clean) {
        settings.forEach(function (setting) {
          setting = cleanSetting(setting);
        });
      }
      callback(settings);
    }
  });
};

SettingSchema.statics.getSettingById = function (params, callback) {

  this.findById(params.id, function (err, setting) {
    if (err) {
      console.log(err);
    } else {
      if (params.clean) {
        setting = cleanSetting(setting);
      }
      callback(setting);
    }
  });
};

var cleanSetting = function (setting) {
  if (setting.clean) {
    setting.value = "..." + setting.value.slice(-5);
  }
  return setting;
};

module.exports = mongoose.model("Setting", SettingSchema);