'use strict';
// admin routes
// contains routes for the main admin page
// requires admin to be logged in

var express = require('express'),
	passport = require('passport'),
	router = express.Router(),
	middleware = require('../../middleware'),
	routes = require('../routeTree');

// Admin panel
router.get('/', function(req, res) {
	if (!req.isAuthenticated()) {
		res.render('admin/login');
	} else {
		res.render('admin/panel');
	}
});

router.post('/', passport.authenticate('local', {
	successRedirect: routes.admin,
	successFlash: 'Welcome!',
	failureRedirect: routes.admin,
	failureFlash: true
}), function(req, res) {});

// logout route
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You are logged out!')
	res.redirect(routes.admin);
});

module.exports = router;
