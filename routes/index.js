var express = require('express'),
	router = express.Router();

// Connect routes
var adminRoutes = require('./admin'),
	bikeRoutes = require('./admin/bikes'),
	subscriberRoutes = require('./admin/subscribers'),
	userRoutes = require('./admin/users'),
	apiRoutes = require('./api'),
	inviteRoutes = require('./admin/invite');

var routes = {
	admin: '/a',
	logout: '/a/logout',
	setup: '/a/setup',
	bikes: '/a/bikes',
	subscribers: '/a/subscribers',
	users: '/a/users',
	invite: '/a/invite',
	api: '/api'
}

// User schema
var User = require('../models/User');

// Root ('/') route
router.get('/', function(req, res) {
	User.count({}, function(err, count) {
		if (count - 1 > 0) {
			res.render('index');
		} else {
			res.render('setup');
		}
	});

});

router.use('/a', adminRoutes);
router.use('/a/setup', setupRoutes);
router.use('/a/bikes', bikeRoutes);
router.use('/a/subscribers', subscriberRoutes);
router.use('/a/users', userRoutes);
router.use('/a/invite', inviteRoutes);
router.use('/api', apiRoutes);

router.get('*', function(req, res) {
	res.render('404');
});

module.exports = {
	router: router
};
