// Setting model
// Stores key/value pairs for in app settings
var mongoose = require("mongoose");

// Need to add user feedback, untested validation on 6/13
var SettingSchema = new mongoose.Schema({
	key: {
		type: String,
		required: [true, 'Setting key is required']
	},
	value: {
		type: String,
		required: [true, 'Setting value is required']
	}
});

// findByKey
// queries the database for a Setting by key value
// does not handle error; passes both error and setting to the callback
SettingSchema.statics.findByKey = function(key, callback) {
	return this.findOne({
		'key': key
	}, function(err, setting) {
		callback(err, setting);
	});
};

// findByKeyAndUpdate
// queries the database for a Setting by key value, updates the value, and saves it
// does not handle error; passes both error and setting to the callback
SettingSchema.statics.findByKeyAndUpdate = function(key, value, callback) {
	return this.findOne({
		'key': key
	}, function(err, setting) {
		setting.value = value;
		setting.save();
		callback(err, setting);
	});
};

// export
module.exports = mongoose.model("Setting", SettingSchema);
