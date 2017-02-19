// admin routes
// contains routes for the main admin page
// requires user to be logged in

var express = require('express'),
	passport = require('passport'),
	router = express.Router(),
	middleware = require('../../middleware');

// Admin panel
router.get('/', function(req, res) {
	if (!req.isAuthenticated()) {
		res.render('admin/index');
	} else {
		res.render('admin/panel');
	}
});

router.post('/', passport.authenticate('local', {
	successRedirect: '/a',
	successFlash: 'Welcome!',
	failureRedirect: '/a',
	failureFlash: true
}), function(req, res) {});

// logout route
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You are logged out!')
	res.redirect('/');
});

module.exports = router;
