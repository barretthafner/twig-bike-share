'use strict';
var express = require('express');
var router = express.Router();

var middleware = require('../middleware');

var routes = require('../config').routes;

// Root ('/') route
router.get(routes.root, function(req, res) {
	res.render('index');
});

// Connect routes
router.use(routes.setup, require('./setup'));
router.use(routes.admin, require('./admin'));
router.use(routes.twilioApi, require('./twilioApi'));
router.use(routes.signUp, require('./signup'));
router.use(routes.bikes, middleware.isLoggedIn, require('./admin/bikes'));
router.use(routes.administrators, middleware.isLoggedIn, require('./admin/administrators'));
router.use(routes.subscriberGroups, middleware.isLoggedIn, require('./admin/subscriberGroups'));


router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;
