'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware'),
	Setting = require('../../models/Setting'),
	routes = require('../routeTree');


// INDEX route
router.get('/', middleware.isLoggedIn, function(req, res) {
	Setting.find({}, function(err, settings) {
		if (err) {
			req.flash(err);
			res.redirect(routes.admin);
		} else {
			res.render('settings/index', {
				settings: settings
			});
		}
	});
});

// EDIT route
router.get('/:setting_id/edit', middleware.isLoggedIn, function(req, res) {
	Setting.findById(req.params.setting_id, function(err, setting) {
		if (err) {
			req.flash(err);
		} else {
			res.render('settings/edit', {
				setting: setting
			})
		}
	});
});

// UPDATE route
router.put('/:setting_id', middleware.isLoggedIn, function(req, res) {
	Setting.findById(req.params.setting_id, function(err, setting) {
		if (err) {
			req.flash(err);
		} else {
			setting.value = req.body.setting.value;
			setting.save(function(err) {
				if (err) {
					req.flash('error', err);
				} else {
					req.flash('success', 'Setting \'' + setting.key + '\' was updated!');
					res.redirect(routes.settings);
				}
			});
		}
	});
});

module.exports = router;
