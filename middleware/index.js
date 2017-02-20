var routes = require('../routes').routes;

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
middlewareObj.globals = function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	// res.locals.routes = routes;
	next();
}

// Export -------------------------------------------------------------------

module.exports = middlewareObj;
