'use strict';
var express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	path = require('path'),
	fs = require('fs'),
	SubscriberGroup = require('../../models/SubscriberGroup'),
	Subscriber = require('../../models/Subscriber'),
	routes = require('../../config').routes;

var upload = multer({ dest: path.resolve(__dirname, '../../public/logos')});


// INDEX route
router.get('/', function(req, res) {
	SubscriberGroup.find({}).populate('subscribers').exec(function(err, subscriberGroups) {
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
router.post('/', upload.single('logo'), function(req, res) {
	SubscriberGroup.addNew(req.body.subscriberGroup, function(err, subscriberGroup) {
		if (err) {
			req.flash('error', 'Server error adding subscriber group: ' + err.message);
			console.log(err);
			res.redirect(routes.subscriberGroups);
		} else {
			var file = req.file;
			if (file) {
				// rename new logo and set subscriberGroup.logoSrc
				var publicPath = 'logos/' + subscriberGroup.signUpSlug + '.' + file.originalname.split('.').pop();
				fs.renameSync(file.path, path.resolve(__dirname, '../../public', publicPath));
				subscriberGroup.logoSrc = '/' + publicPath;
				subscriberGroup.save(function(err) {
					if (err) {
						req.flash('error', 'Server error adding subscriber group: ' + err.message);
					} else {
						req.flash('success', subscriberGroup.groupName + ' subscriber group added!');
					}
					res.redirect(routes.subscriberGroups);
				});
			} else {
				res.redirect(routes.subscriberGroups);
			}
		}
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
// Using post because of multer
router.post('/:id', upload.single('logo'), function(req, res) {
	var subscriberGroup = req.body.subscriberGroup;

	subscriberGroup.hidden = !!subscriberGroup.hidden;

	SubscriberGroup.findByIdAndUpdate(req.params.id, subscriberGroup, { runValidators: true }, function(err, subscriberGroup) {
		if (err) {
			req.flash('error', 'Server error updating subscriber group: ' + err.message);
			res.redirect('back');
		} else {
			var file = req.file;
			if (file) {
				// remove old file
				if (subscriberGroup.logoSrc) {
					fs.unlinkSync(path.resolve(__dirname, '../../public' + subscriberGroup.logoSrc));
				}
				// rename new logo and set subscriberGroup.logoSrc
				var publicPath = 'logos/' + subscriberGroup.signUpSlug + '.' + file.originalname.split('.').pop();
				fs.renameSync(file.path, path.resolve(__dirname, '../../public', publicPath));
				subscriberGroup.logoSrc = '/' + publicPath;
				subscriberGroup.save(function(err) {
					if (err) {
						req.flash('error', 'Server error updating subscriber group: ' + err.message);
					} else {
						req.flash('success', subscriberGroup.groupName + ' subscriber group updated!');
					}
					res.redirect('back');
				});
			} else {
				res.redirect('back');
			}
		}
	});
});

// Render DELETE form
router.get('/:id/delete', function(req, res) {
	SubscriberGroup.findById(req.params.id, function(err, subscriberGroup) {
		if (err) {
			req.flash('error', 'Server error finding subscriber group: ' + err.message);
			res.redirect(routes.subscriberGroups);
		} else {
			res.render('admin/subscriberGroups/delete', {
				subscriberGroup: subscriberGroup
			});
		}
	});
});

// DESTROY route
router.delete('/:id', function(req, res) {
	SubscriberGroup.findByIdAndRemoveWithSubscribers(req.params.id, function(err) {
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
			});
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
router.put('/:id' + routes.subscribers + '/:subscriberId', function(req, res) {
	var subscriber = req.body.subscriber;

	subscriber.active = !!subscriber.active;

	Subscriber.findByIdAndUpdate(req.params.subscriberId, subscriber, { runValidators: true }, function(err) {
		if (err) {
			req.flash('error', 'Server error updating subscriber: ' + err);
		}
		res.redirect(routes.subscriberGroups + '/' + req.params.id + routes.subscribers);
	});
});

// Group subscriber DESTROY route
router.delete('/:id' + routes.subscribers + '/:subscriberId', function(req, res) {
	Subscriber.findById(req.params.subscriberId, function(err, subscriber) {
		if (err) {
			req.flash('error', 'Server error deleting subscriber: ' + err);
		} else {
			// using remove because hooks don't fire on findByIdAndRemove and we need them to update subscriberGroup...ugh
			subscriber.remove(function(err) {
				if (err) {
					req.flash('error', 'Server error deleting subscriber: ' + err);
				}
			});
		}
		res.redirect(routes.subscriberGroups + '/' + req.params.id + routes.subscribers);
	});
});

module.exports = router;
