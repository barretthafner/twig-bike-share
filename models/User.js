// User model
// Stores administrator users that may log into the app
var mongoose = require("mongoose");

// Need to add user feedback, untested validation on 6/13
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username field is required']
  },
  password: {
    type: String,
    required: [true, 'Password field is required']
  }
});

// plugin passport local for auth
UserSchema.plugin(passportLocalMongoose);

// export
module.exports = mongoose.model("User", UserSchema)
