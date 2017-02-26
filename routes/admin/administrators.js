'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware'),
	Administrator = require('../../models/Administrator'),
	routes = require('../../config').routes;


// INDEX route
router.get('/', middleware.isLoggedIn, function(req, res) {
	Administrator.find({}, function(err, administrators) {
		if (err) {
			res.flash('error', err.message);
			res.redirect(routes.admin);
		} else {
			res.render('admin/administrators/index', {
				administrators: administrators
			});
		}
	});
});

// NEW route
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('admin/administrators/new');
});

// CREATE route
router.post('/', middleware.isLoggedIn, function(req, res) {
	var administrator = req.body.user;
	var newAdministrator = new Administrator({
		name: administrator.name,
		username: administrator.username
	});
	Administrator.register(newAdministrator, administrator.password, function(err, administrator) {
		if (err) {
			req.flash('error', err.message);
		} else {
			req.flash('success', 'Added administrator: ' + administrator.username);
		}
		res.redirect(routes.administrators);
	});
});

// EDIT route
router.get('/:admin_id/edit', middleware.isLoggedIn, function(req, res) {
	Administrator.findById(req.params.admin_id, function(err, administrator) {
		if (err) {
			req.flash('error', err.message);
			res.redirect(routes.administrators);
		} else {
			res.render('admin/administrators/edit', {
				administrator: administrator
			})
		}
	});
});

// UPDATE route
router.put('/:admin_id', middleware.isLoggedIn, function(req, res) {
	Administrator.findById(req.params.admin_id, function(err, administrator) {
		if (err) {
			req.flash('error', err.message);
		} else {
			administrator.setPassword(req.body.user.password, function(err) {
				if (err) {
					req.flash('error', err.message);
				} else {
					administrator.save();
					req.flash('success', 'Password for ' + administrator.username + ' changed!');
				}
			});
		}
		res.redirect(routes.administrators);
	});
});

// DESTROY route
router.delete('/:admin_id', middleware.isLoggedIn, function(req, res) {
	Administrator.findByIdAndRemove(req.params.admin_id, function(err) {
		if (err) {
			req.flash('error', err.message);
		} else {
			req.flash('success', 'Administrator removed');
		}
		res.redirect(routes.administrators);
	});
});

module.exports = router;
