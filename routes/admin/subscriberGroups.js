'use strict';
var express = require("express"),
	router = express.Router(),
	middleware = require("../../middleware"),
	SubscriberGroup = require("../../models/SubscriberGroup"),
	routes = require('../routeTree');


// INDEX route
router.get("/", middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.find({}, function(err, subscriberGroups) {
		if (err) {
			req.flash('error', 'Server error finding subscriber groups: ' + err);
			res.redirect(routes.admin);
		} else {
			res.render("subscriberGroups/index", {
				subscriberGroups: subscriberGroups
			});
		}
	});
});

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("subscriberGroups/new");
});

// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.create(req.body.subscriberGroup, function(err) {
		if (err) {
			req.flash('error', 'Server error adding subscriber group: ' + err);
		}
		res.redirect(routes.subscriberGroups);
	});
});

// EDIT route
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.findById(req.params.id, function(err, subscriberGroup) {
		if (err) {
			req.flash('error', 'Server error finding subscriber group: ' + err);
		} else {
			res.render("subscriberGroups/edit", {
				subscriberGroup: subscriberGroup
			});
		}
	});
});

// UPDATE route
router.put("/:id", middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.findByIdAndUpdate(req.params.id, req.body.subscriberGroup, function(err) {
		if (err) {
			req.flash('error', 'Server error updating subscriber group: ' + err);
		}
		res.redirect(routes.subscriberGroups);
	})
});

// DESTROY route
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
	SubscriberGroup.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			req.flash('error', 'Server error deleting subscriber group: ' + err);
		}
		res.redirect(routes.subscriberGroups);
	});
});

module.exports = router;
