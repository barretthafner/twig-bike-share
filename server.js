'use strict';
// Include packages -------------------------------------------------------------------
require('newrelic');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
var helmet = require('helmet');
var bluebird = require('bluebird');

var config = require('./config');
var middleware = require('./middleware');

var app = express();

// Redirect insecure traffic if protocol is https
if (config.protocol === 'https://') {
	app.use(middleware.redirectInsecure);
}

// Use Helmet
app.use(helmet());

// Serve '/public' folder
app.use(express.static(__dirname + '/public'));

// Connect Database
mongoose.connect(config.dbUrl);

// Use native promises
mongoose.Promise = bluebird;

// View Engine
app.set('view engine', 'ejs');

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Method Override
app.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		var method = req.body._method
		delete req.body._method
		return method
	}
}));

// Flash messages
app.use(flash());

// Express Session (for passport)
app.use(session({
	secret: config.appSecret,
	name: 'sessionId',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		url: config.dbUrl,
		ttl: 1 * 24 * 60 * 60 // Removes sessions after 1 day.
	})
}));

// Passport
var Administrator = require('./models/Administrator');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Administrator.authenticate()));
passport.serializeUser(Administrator.serializeUser());
passport.deserializeUser(Administrator.deserializeUser());

// Pass global values
app.locals.routes = config.routes;
app.locals.siteTitle = config.siteTitle;
app.locals.domain = config.appDomain;
app.locals.protocol = config.protocol;
app.locals.supportEmail = config.supportEmail;
app.locals.supportTimeZone = config.supportTimeZone;
app.locals.supportSite = config.supportSite;
app.use(middleware.addGlobals);

// set global variable to render setup if db is empty
global.dbEmpty = true;
// Check if db needs to be setup
app.use(middleware.checkDbEmpty);



// Serve app routes
var router = require('./routes');
app.use(router);


//Database seed
if (process.argv.indexOf('--seedDb') > -1) {
	var seed = require('./seeds');
	seed({
		administrators: false,
		bikes: false,
		subscriberGroups: false,
		twilio: true
	});
	global.dbEmpty = false;
}

// Start app
app.listen(config.port, config.ipAddress, function() {
	console.log('Server is running at: ' + config.protocol + config.ipAddress + ':' + config.port);
});

exports.app = app;
