'use strict';
var express = require('express'),
	router = express.Router();

// Connect routes
var adminRoutes = require('./admin'),
	bikeRoutes = require('./admin/bikes'),
	subscriberGroupRoutes = require('./admin/subscriberGroups'),
	subscriberRoutes = require('./admin/subscribers'),
	adminsRoutes = require('./admin/admins'),
	inviteRoutes = require('./admin/invite'),
	setupRoutes = require('./admin/setup'),
	settingRoutes = require('./admin/settings'),
	twilioApiRoutes = require('./twilioApi');

var routes = require('./routeTree');

// Root ('/') route
router.get('/', function(req, res) {
	res.render('index');
});

router.use(routes.admin, adminRoutes);
router.use(routes.setup, setupRoutes);
router.use(routes.settings, settingRoutes)
router.use(routes.bikes, bikeRoutes);
router.use(routes.subscribers, subscriberRoutes);
router.use(routes.subscriberGroups, subscriberGroupRoutes);
router.use(routes.admins, adminsRoutes);
router.use(routes.invite, inviteRoutes);
router.use(routes.twilioApi, twilioApiRoutes);

router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;
