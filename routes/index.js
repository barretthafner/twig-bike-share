'use strict';
var express = require('express');
var router = express.Router();

var routes = require('../config').routes;

// Connect routes
var setupRoutes = require('./setup');
var twilioApiRoutes = require('./twilioApi');
var signUpRoutes = require('./signup');
var adminRoutes = require('./admin');
var bikeRoutes = require('./admin/bikes');
var administratorsRoutes = require('./admin/administrators');
var subscriberGroupRoutes = require('./admin/subscriberGroups');

// Root ('/') route
router.get(routes.root, function(req, res) {
	res.render('index');
});

router.use(routes.setup, setupRoutes);
router.use(routes.admin, adminRoutes);
router.use(routes.twilioApi, twilioApiRoutes);
router.use(routes.signUp, signUpRoutes);
router.use(routes.bikes, bikeRoutes);
router.use(routes.administrators, administratorsRoutes);
router.use(routes.subscriberGroups, subscriberGroupRoutes);


router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;
