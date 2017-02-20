'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware'),
	User = require('../../models/User'),
	routes = require('../tree');


// INDEX route
router.get('/', middleware.isLoggedIn, function(req, res) {
	User.find({}, function(err, users) {
		if (err) {
			res.flah('error', err);
			res.redirect(routes.admin);
		} else {
			res.render('users/index', {
				users: users
			});
		}
	});
});

// NEW route
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('users/new');
});

// CREATE route
router.post('/', middleware.isLoggedIn, function(req, res) {
	var user = req.body.user;
	var newUser = new User({
		name: user.name,
		username: user.username
	});
	User.register(newUser, user.password, function(err, user) {
		if (err) {
			console.log(err);
			res.redirect(routes.users);
		} else {
			console.log('added user:' + user.username);
			res.redirect(routes.users);
		}
	});
});

// EDIT route
router.get('/:user_id/edit', middleware.isLoggedIn, function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			console.log(err);
			res.redirect(routes.users);
		} else {
			res.render('users/edit', {
				user: user
			})
		}
	});
});

// UPDATE route
router.put('/:user_id', middleware.isLoggedIn, function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			console.log(err);
			res.redirect(routes.users);
		} else {
			user.setPassword(req.body.user.password, function(err) {
				if (err) {
					console.log(err);
					res.redirect(routes.users);
				} else {
					user.save();
					console.log('password for ' + user.username + ' changed!');
					res.redirect(routes.users);
				}
			});
		}
	});
});

// DESTROY route
router.delete('/:user_id', middleware.isLoggedIn, function(req, res) {
	User.findByIdAndRemove(req.params.user_id, function(err) {
		if (err) {
			console.log(err);
			res.redirect(routes.users);
		} else {
			res.redirect(routes.users);
		}
	});
});

module.exports = router;
