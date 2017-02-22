'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware'),
	Admin = require('../../models/Admin'),
	routes = require('../routeTree');


// INDEX route
router.get('/', middleware.isLoggedIn, function(req, res) {
	Admin.find({}, function(err, admins) {
		if (err) {
			res.flash('error', err);
			res.redirect(routes.admin);
		} else {
			res.render('admins/index', {
				admins: admins
			});
		}
	});
});

// NEW route
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('admins/new');
});

// CREATE route
router.post('/', middleware.isLoggedIn, function(req, res) {
	var admin = req.body.user;
	var newAdmin = new Admin({
		name: admin.name,
		username: admin.username
	});
	Admin.register(newAdmin, admin.password, function(err, admin) {
		if (err) {
			console.log(err);
			res.redirect(routes.admins);
		} else {
			console.log('added admin:' + admin.username);
			res.redirect(routes.admins);
		}
	});
});

// EDIT route
router.get('/:admin_id/edit', middleware.isLoggedIn, function(req, res) {
	Admin.findById(req.params.admin_id, function(err, admin) {
		if (err) {
			console.log(err);
			res.redirect(routes.admins);
		} else {
			res.render('admins/edit', {
				admin: admin
			})
		}
	});
});

// UPDATE route
router.put('/:admin_id', middleware.isLoggedIn, function(req, res) {
	Admin.findById(req.params.admin_id, function(err, admin) {
		if (err) {
			console.log(err);
			res.redirect(routes.admins);
		} else {
			admin.setPassword(req.body.user.password, function(err) {
				if (err) {
					console.log(err);
					res.redirect(routes.admins);
				} else {
					admin.save();
					console.log('password for ' + admin.username + ' changed!');
					res.redirect(routes.admins);
				}
			});
		}
	});
});

// DESTROY route
router.delete('/:admin_id', middleware.isLoggedIn, function(req, res) {
	Admin.findByIdAndRemove(req.params.admin_id, function(err) {
		if (err) {
			console.log(err);
			res.redirect(routes.admins);
		} else {
			res.redirect(routes.admins);
		}
	});
});

module.exports = router;
