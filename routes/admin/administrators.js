'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware'),
	Administrator = require('../../models/Administrator'),
	routes = require('../../config').routes;


// INDEX route
router.get('/', function(req, res) {
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
router.get('/new', function(req, res) {
	res.render('admin/administrators/new');
});

// CREATE route
router.post('/', function(req, res) {
	var administrator = req.body.administrator;
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
router.get('/:id/edit', function(req, res) {
	Administrator.findById(req.params.id, function(err, administrator) {
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
router.put('/:id', function(req, res) {
	Administrator.findByIdAndUpdate(req.params.id, req.body.administrator, function(err, administrator) {
		if (err) {
			req.flash('error', err.message);
		} else {
			req.flash('success', 'User: ' + administrator.username + ' updated!');
		}
		res.redirect(routes.administrators);
	});
});

// EDIT password route
router.get('/:id/password', function(req, res) {
	Administrator.findById(req.params.id, function(err, administrator) {
		if (err) {
			req.flash('error', err.message);
			res.redirect(routes.administrators);
		} else {
			res.render('admin/administrators/password', {
				administrator: administrator
			});
		}
	});
});

// UPDATE password route
router.put('/:id/password', function(req, res) {
	Administrator.findById(req.params.id, function(err, administrator) {
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
router.delete('/:id', function(req, res) {
	Administrator.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			req.flash('error', err.message);
		} else {
			req.flash('success', 'Administrator removed');
		}
		res.redirect(routes.administrators);
	});
});

module.exports = router;
