'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../../middleware'),
	SubscriberGroup = require('../../../models/SubscriberGroup'),
	routes = require('../../../config').routes;


// INDEX route
router.get('/', middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.find({}, function(err, subscriberGroups) {
		if (err) {
			req.flash('error', 'Server error finding subscriber groups: ' + err.message);
			res.redirect(routes.admin);
		} else {
			res.render('admin/subscriberGroups/index', {
				subscriberGroups: subscriberGroups
			});
		}
	});
});

// NEW route
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('admin/subscriberGroups/new');
});

// CREATE route
router.post('/', middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.createWithUrl(req.body.subscriberGroup, function(err) {
		if (err) { req.flash('error', 'Server error adding subscriber group: ' + err.message); console.log(err); }
		res.redirect(routes.subscriberGroups);
	});
});

// EDIT route
router.get('/:id/edit', middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.findById(req.params.id, function(err, subscriberGroup) {
		if (err) {
			req.flash('error', 'Server error finding subscriber group: ' + err.message);
			res.redirect(routes.subscriberGroups);
		} else {
			res.render('admin/subscriberGroups/edit', {
				subscriberGroup: subscriberGroup
			});
		}
	});
});

// UPDATE route
router.put('/:id', middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.findByIdAndUpdate(req.params.id, req.body.subscriberGroup, function(err) {
		if (err) { req.flash('error', 'Server error updating subscriber group: ' + err.message); }
		res.redirect(routes.subscriberGroups);
	})
});

// DESTROY route
router.delete('/:id', middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.findByIdAndRemove(req.params.id, function(err) {
		if (err) { req.flash('error', 'Server error deleting subscriber group: ' + err.message); }
		res.redirect(routes.subscriberGroups);
	});
});


// Group subscriber index
router.get('/:id/subscribers', middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.findById(req.params.id).populate('subscribers').exec(function(err, subscriberGroups) {
		if (err) {
			req.flash('error', 'Server error finding subscribers: ' + err.message);
			res.redirect(routes.subscriberGroups);
		} else {
			res.render('admin/subscriberGroups/subscribers', {
				subscriberGroup
			})
		}
	});
})

module.exports = router;
