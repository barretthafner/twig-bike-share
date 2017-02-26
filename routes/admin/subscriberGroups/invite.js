'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware');

var Setting = require('../../models/Setting');

// EDIT Route
router.get('/edit', middleware.isLoggedIn, function(req, res) {
	Setting.findByKey('inviteHtml', function(err, invite) {
		if (err) {
			res.redirect('/subscribers');
		} else {
			res.render('invite/edit', {
				invite: invite
			});
		}
	});
});

// UPDATE route
router.put('/edit', middleware.isLoggedIn, function(req, res) {
	Setting.findByKeyAndUpdate('inviteHtml', req.body.inviteHtml, function(err, invite) {
		if (err) {
			console.log(err);
			res.redirect('/subscribers');
		} else {
			res.render('invite/edit', {
				invite: invite
			});
		}
	});
});

module.exports = router;
