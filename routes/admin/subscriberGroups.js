'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware'),
	SubscriberGroup = require('../../models/SubscriberGroup'),
	Subscriber = require('../../models/Subscriber'),
	routes = require('../../config').routes;


// INDEX route
router.get('/', function(req, res) {
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
router.get('/new', function(req, res) {
	res.render('admin/subscriberGroups/new');
});

// CREATE route
router.post('/', function(req, res) {
	SubscriberGroup.create(req.body.subscriberGroup, function(err) {
		if (err) { req.flash('error', 'Server error adding subscriber group: ' + err.message); }
		res.redirect(routes.subscriberGroups);
	});
});

// SHOW route
// redirect to INDEX route
router.get('/:id', function(req, res) {
	res.redirect(routes.subscriberGroups);
});

// EDIT route
router.get('/:id/edit', function(req, res) {
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
router.put('/:id', function(req, res) {
	SubscriberGroup.findByIdAndUpdate(req.params.id, req.body.subscriberGroup, function(err) {
		if (err) { req.flash('error', 'Server error updating subscriber group: ' + err.message); }
		res.redirect(routes.subscriberGroups);
	})
});

// DESTROY route
router.delete('/:id', function(req, res) {
	SubscriberGroup.findByIdAndRemove(req.params.id, function(err) {
		if (err) { req.flash('error', 'Server error deleting subscriber group: ' + err.message); }
		res.redirect(routes.subscriberGroups);
	});
});


// Group subscriber INDEX route
router.get('/:id' + routes.subscribers, function(req, res) {
	SubscriberGroup.findById(req.params.id).populate('subscribers').exec(function(err, subscriberGroup) {
		if (err) {
			req.flash('error', 'Server error finding subscribers: ' + err.message);
			res.redirect(routes.subscriberGroups);
		} else {
			res.render('admin/subscriberGroups/subscribers/index', {
				groupId: subscriberGroup.id,
				subscribers: subscriberGroup.subscribers
			})
		}
	});
});

// Group subscriber EDIT route
router.get('/:id' + routes.subscribers + '/:subscriberId/edit', function(req, res) {
	Subscriber.findById(req.params.subscriberId, function(err, subscriber) {
		if (err) {
			req.flash('error', 'Server error finding subscriber: ' + err.message);
			res.redirect(routes.subscriberGroups);
		} else {
			res.render('admin/subscriberGroups/subscribers/edit', {
				subscriber: subscriber,
				groupId: req.params.id
			});
		}
	});
});

// Group subscriber UPDATE route
router.put('/:id' + routes.subscribers + '/:subsciberId', function(req, res) {
	var subscriber = req.body.subscriber;

	subscriber.active = !!subscriber.active;
	subscriber.invited = !!subscriber.invited;

	// if (subscriber.active) {
	// 	subscriber.active = true;
	// } else {
	// 	subscriber.active = false;
	// }
	// if (subscriber.invited) {
	// 	subscriber.invited = true;
	// } else {
	// 	subscriber.invited = false;
	// }

	Subscriber.findByIdAndUpdate(req.params.id, req.body.subscriber, function(err) {
		if (err) {
			req.flash('error', 'Server error updating subscriber: ' + err);
		}
		res.redirect(routes.subscribers);
	})
});

// Group subscriber DESTROY route
router.delete('/:id' + routes.subscribers + '/:subsciberId', function(req, res) {
	Subscriber.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			req.flash('error', 'Server error deleting subscriber: ' + err);
		}
		res.redirect(routes.subscribers);
	});
});




module.exports = router;
