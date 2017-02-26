'use strict';
var express = require('express');
var router = express.Router();

// Connect routes
var adminRoutes = require('./admin');
var bikeRoutes = require('./admin/bikes');
var adminsRoutes = require('./admin/admins');
var setupRoutes = require('./admin/setup');
var twilioApiRoutes = require('./twilioApi');
var subscriberGroupRoutes = require('./admin/subscriberGroups');
	// var subscriberRoutes = require('./admin/subscribers');
	// var inviteRoutes = require('./admin/invite');
	// var settingRoutes = require('./admin/settings');

var routes = require('./routeTree');

// Root ('/') route
router.get('/', function(req, res) {
	res.render('index');
});

router.use(routes.admin, adminRoutes);
router.use(routes.twilioApi, twilioApiRoutes);
router.use(routes.setup, setupRoutes);
router.use(routes.bikes, bikeRoutes);
router.use(routes.admins, adminsRoutes);
router.use(routes.subscriberGroups, subscriberGroupRoutes);
// router.use(routes.subscribers, subscriberRoutes);
// router.use(routes.settings, settingRoutes);
// router.use(routes.invite, inviteRoutes);

router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;
