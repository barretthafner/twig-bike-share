'use strict';
var routes = require('../config').routes;

var middlewareObj = {};

// Auth middleware -------------------------------------------------------------------
// Checks to see if the client is logged in

middlewareObj.isLoggedIn = function(req, res, next) {
	if (!req.isAuthenticated()) {
		req.flash('error', 'Please login!');
		res.redirect('/a');
	} else {
		return next();
	}
};

// Global values middleware
middlewareObj.addGlobals = function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
}

// Check if we need to render the setup page
middlewareObj.checkDbEmpty = function(req, res, next) {
	if (global.dbEmpty) {
		var re = new RegExp(routes.setup);
		if (req.url.match(re)) {
			console.log('bam!');
			next()
		} else {
			var Administrator = require('../models/Administrator');
			Administrator.count({}, function(err, count) {
				if (count > 0) {
					global.dbEmpty = false;
					next();
				} else {
					res.redirect(routes.setup);
				}
			});
		}
	} else {
		next();
	}
}

// Export -------------------------------------------------------------------

module.exports = middlewareObj;
