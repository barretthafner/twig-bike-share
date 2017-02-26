'use strict';
var express = require('express'),
	router = express.Router(),
	routes = require('../config').routes,
	seed = require('../seeds'),
	twilio = require('../modules/twilio');

var Administrator = require('../models/Administrator');

router.get('/', function(req, res) {
	Administrator.count({}, function(err, count) {
		if (count > 0) {
			res.sendStatus(404);
		} else {
			res.render('setup');
		}
	});
});

// Administrator panel
router.post('/', function(req, res) {
	Administrator.count({}, function(err, count) {
		// if there is 1 or more administrators in the data base return 404
		if (count > 0) {
			res.sendStatus(404);
		} else {
			// else add new user and register
			var administrator = req.body.user;
			var newAdministrator = new Administrator({
				name: administrator.name,
				username: administrator.username
			});
			Administrator.register(newAdministrator, administrator.password, function(err, administrator) {
				if (err) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect(routes.setup);
				} else {
					console.log('added administrator:' + administrator.username);
					// instantiate the database and set twilio endpoints
					seed({
						administrators: false,
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
