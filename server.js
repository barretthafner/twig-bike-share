'use strict';
// Include packages -------------------------------------------------------------------
var express = require('express'),
	config = require('./config'),
	middleware = require('./middleware'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	flash = require('connect-flash');

var app = express();

// Serve '/public' folder
app.use(express.static(__dirname + '/public'));

// Connect Database
mongoose.connect(config.dbUrl);

// Use native promises
mongoose.Promise = global.Promise;

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
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		url: config.dbUrl,
		ttl: 1 * 24 * 60 * 60 // Removes sessions after 1 day.
	})
}));

// Passport
var Admin = require('./models/Admin');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Pass global values
app.locals.routes = require('./routes/routeTree');
app.locals.siteTitle = config.siteTitle;
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
	var seedDb = require('./seeds').seedDb;
	seedDb({
		admin: true,
		bikes: true
	});
	global.dbEmpty = false;
}

// Start app
app.listen(config.port, config.ipAddress, function() {
	console.log('Server is running at: http://' + config.ipAddress + ':' + config.port);
});

exports.app = app;
