'use strict';
var express = require('express');
var router = express.Router();

var routes = require('../config').routes;

// Connect routes
var setupRoutes = require('./setup');
var adminRoutes = require('./admin');
var bikeRoutes = require('./admin/bikes');
var adminsRoutes = require('./admin/admins');
var twilioApiRoutes = require('./twilioApi');
var subscriberGroupRoutes = require('./admin/subscriberGroups');
	// var subscriberRoutes = require('./admin/subscribers');
	// var inviteRoutes = require('./admin/invite');
	// var settingRoutes = require('./admin/settings');


// Root ('/') route
router.get(routes.root, function(req, res) {
	res.render('index');
});

router.use(setupRoutes);
router.use(adminRoutes);
router.use(twilioApiRoutes);
router.use(bikeRoutes);
router.use(adminsRoutes);
router.use(subscriberGroupRoutes);
// router.use(subscriberRoutes);
// router.use(settingRoutes);
// router.use(inviteRoutes);

router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;
