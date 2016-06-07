// Include packages -------------------------------------------------------------------
var mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    session         = require("express-session"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local");

// Instantiate config object -------------------------------------------------------------------

var config = {};

// Set environment variables -------------------------------------------------------------------

config.ipAddress     = process.env.IP;
config.port          = process.env.PORT;
config.dbUrl         = process.env.OPENBIKEDBURL;
config.appSecret     = process.env.OPENBIKESECRET;

// Configure function -------------------------------------------------------------------

config.configure = function(expressApp) {

  var app = expressApp;

  // Connect Database
  mongoose.connect(config.dbUrl);
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

  // Pass global middleware
  app.use(function(req, res, next){
      res.locals.currentUser = req.user;
      next();
  });
};

// Export module -------------------------------------------------------------------
module.exports = config;
