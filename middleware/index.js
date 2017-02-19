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

// Export -------------------------------------------------------------------

module.exports = middlewareObj;
