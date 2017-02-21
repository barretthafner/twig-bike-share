'use strict';
var express = require('express'),
	router = express.Router();

// Connect routes
var adminRoutes = require('./admin'),
	bikeRoutes = require('./admin/bikes'),
	subscriberRoutes = require('./admin/subscribers'),
	adminsRoutes = require('./admin/admins'),
	inviteRoutes = require('./admin/invite'),
	setupRoutes = require('./admin/setup'),
	apiRoutes = require('./api');

// Admin schema
var Admin = require('../models/Admin');

var routes = require('./tree');

// Root ('/') route
router.get('/', function(req, res) {
	Admin.count({}, function(err, count) {
		if (count > 0) {
			res.render('index');
		} else {
			res.redirect(routes.setup);
		}
	});
});

router.use(routes.admin, adminRoutes);
router.use(routes.setup, setupRoutes);
router.use(routes.bikes, bikeRoutes);
router.use(routes.subscribers, subscriberRoutes);
router.use(routes.admins, adminsRoutes);
router.use(routes.invite, inviteRoutes);
router.use(routes.api, apiRoutes);

router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;
