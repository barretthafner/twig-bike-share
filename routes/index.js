var express = require('express'),
	router = express.Router();

// Connect routes
var adminRoutes = require('./admin'),
	bikeRoutes = require('./admin/bikes'),
	subscriberRoutes = require('./admin/subscribers'),
	userRoutes = require('./admin/users'),
	apiRoutes = require('./api'),
	inviteRoutes = require('./admin/invite');

// User schema
var User = require('../models/User');

var routes = require('./tree');

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

router.use(routes.admin, adminRoutes);
// router.use('/a/setup', setupRoutes);
router.use(routes.bikes, bikeRoutes);
router.use(routes.subscribers, subscriberRoutes);
router.use(routes.users, userRoutes);
router.use(routes.invite, inviteRoutes);
router.use(routes.api, apiRoutes);

router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;
