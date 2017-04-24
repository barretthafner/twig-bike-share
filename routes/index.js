'use strict';
var express = require('express');
var router = express.Router();

var SubscriberGroup = require('../models/SubscriberGroup');

var middleware = require('../middleware');

var routes = require('../config').routes;

// Root ('/') route
router.get(routes.root, function(req, res) {
	SubscriberGroup.getPublicGroups(function(err, subscriberGroups) {
		if (err) {
			req.flash('error', err.message);
			res.render('index', {
				subscriberGroups: null
			});
		} else {
			res.render('index', {
				subscriberGroups: subscriberGroups
			});
		}
	})
});

// Connect routes
router.use(routes.setup, require('./setup'));
router.use(routes.admin, require('./admin'));
router.use(routes.twilioApi, require('./twilioApi'));
router.use(routes.signUp, require('./signup'));
router.use(routes.bikes, middleware.isLoggedIn, require('./admin/bikes'));
router.use(routes.administrators, middleware.isLoggedIn, require('./admin/administrators'));
router.use(routes.subscriberGroups, middleware.isLoggedIn, require('./admin/subscriberGroups'));
router.use(routes.data, middleware.isLoggedIn, require('./admin/data'));
router.use(routes.locations, middleware.isLoggedIn, require('./admin/locations'));


router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;
