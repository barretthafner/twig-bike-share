'use strict';
var express = require('express'),
	router = express.Router(),
	routes = require('./routeTree'),
	seed = require('../seeds'),
	twilio = require('../modules/twilio');

var Admin = require('../models/Admin');

router.get('/', function(req, res) {
	Admin.count({}, function(err, count) {
		if (count > 0) {
			res.sendStatus(404);
		} else {
			res.render('setup');
		}
	});
});

// Admin panel
router.post('/', function(req, res) {
	Admin.count({}, function(err, count) {
		// if there is 1 or more admins in the data base return 404
		if (count > 0) {
			res.sendStatus(404);
		} else {
			// else add new user and register
			var admin = req.body.user;
			var newAdmin = new Admin({
				name: admin.name,
				username: admin.username
			});
			Admin.register(newAdmin, admin.password, function(err, admin) {
				if (err) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect(routes.setup);
				} else {
					console.log("added admin:" + admin.username);
					// instantiate the database and set twilio endpoints
					seed({
						admin: false,
						bikes: true,
						subscriberGroups: true,
						twilio: true
					});
					// keep the setup middleware from triggering
					global.dbEmpty = false;
					res.redirect(routes.admin);
				}
			});
		}
	});
});

module.exports = router;
