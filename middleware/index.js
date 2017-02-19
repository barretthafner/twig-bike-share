var middlewareObj = {};

// Auth middleware -------------------------------------------------------------------
//Checks to see if the client is logged in

middlewareObj.isLoggedIn = function(req, res, next) {
	if (!req.isAuthenticated()) {
		req.flash('error', 'Please login!');
		res.redirect('/a');
	} else {
		return next();
	}
};

middlewareObj.globals = function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
}

// Export -------------------------------------------------------------------

module.exports = middlewareObj;
