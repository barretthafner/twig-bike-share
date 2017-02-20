'use strict';
var express = require('express'),
	router = express.Router(),
	routes = require('../tree');

var User = require('../../models/User');

router.get('/', function(req, res) {
	User.count({}, function(err, count) {
		if (count > 0) {
			res.sendStatus(404);
		} else {
			res.render('setup');
		}
	});
});

// Admin panel
router.post('/', function(req, res) {
	User.count({}, function(err, count) {
		if (count > 0) {
			res.sendStatus(404);
		} else {
			var user = req.body.user;
			var newUser = new User({
				name: user.name,
				username: user.username
			});
			User.register(newUser, user.password, function(err, user) {
				if (err) {
					console.log(err);
					res.redirect(routes.admin);
				} else {
					console.log("added user:" + user.username);
					res.redirect(routes.admin);
				}
			});
		}
	});
});

module.exports = router;
