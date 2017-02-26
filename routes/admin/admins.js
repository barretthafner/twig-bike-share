'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware'),
	Admin = require('../../models/Admin'),
	routes = require('../../config').routes;


// INDEX route
router.get('/', middleware.isLoggedIn, function(req, res) {
	Admin.find({}, function(err, admins) {
		if (err) {
			res.flash('error', err.message);
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
			req.flash('error', err.message);
		} else {
			req.flash('success', 'Added admin: ' + admin.username);
		}
		res.redirect(routes.admins);
	});
});

// EDIT route
router.get('/:admin_id/edit', middleware.isLoggedIn, function(req, res) {
	Admin.findById(req.params.admin_id, function(err, admin) {
		if (err) {
			req.flash('error', err.message);
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
			req.flash('error', err.message);
		} else {
			admin.setPassword(req.body.user.password, function(err) {
				if (err) {
					req.flash('error', err.message);
				} else {
					admin.save();
					req.flash('success', 'Password for ' + admin.username + ' changed!');
				}
			});
		}
		res.redirect(routes.admins);
	});
});

// DESTROY route
router.delete('/:admin_id', middleware.isLoggedIn, function(req, res) {
	Admin.findByIdAndRemove(req.params.admin_id, function(err) {
		if (err) {
			req.flash('error', err.message);
		} else {
			req.flash('success', 'Administrator removed');
		}
		res.redirect(routes.admins);
	});
});

module.exports = router;
