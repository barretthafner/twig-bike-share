// Include packages -------------------------------------------------------------------
var mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    session         = require("express-session"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    middleware      = require("./middleware");

// Instantiate config object -------------------------------------------------------------------

var config = {};

// Set environment variables -------------------------------------------------------------------

config.ipAddress     = process.env.IP;
config.port          = process.env.PORT;
config.dbUrl         = process.env.OPENBIKEDBURL;
config.appSecret     = process.env.OPENBIKESECRET;
config.accountSid    = process.env.TWILIO_ACCOUNT_SID;
config.authToken     = process.env.TWILIO_AUTH_TOKEN;
config.sendingNumber = process.env.TWILIO_NUMBER;

// Configure function -------------------------------------------------------------------

config.configure = function(expressApp) {

  var app = expressApp;

  mongoose.connect(config.dbUrl);

  // Pass global middleware
  app.use(function(req, res, next){
      res.locals.currentUser = req.user;
      next();
  });

  // View Engine
  app.set("view engine", "ejs");
  // Body Parser
  app.use(bodyParser.urlencoded({extended: true}));
  // Method Override
  app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
  }));

  // Express Session (for passport)
  app.use(session({
      secret: config.appSecret,
      resave: false,
      saveUninitialized: false
  }));

  // Passport
  var User = require("./models/User");
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Twilio -------------------------------------------------------------------
  var requiredConfig = [config.accountSid, config.authToken, config.sendingNumber];
  var isConfigured = requiredConfig.every(function(configValue) {
    return configValue || false;
  });

  if (!isConfigured) {
    var errorMessage =
      'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

    throw new Error(errorMessage);
  }

  // Mount middleware to notify Twilio of errors
  app.use(middleware.twilioNotifyOnError);

};

// Export module -------------------------------------------------------------------
module.exports = config;
