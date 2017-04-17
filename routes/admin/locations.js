'use strict';
var express = require('express'),
	router = express.Router(),
	Location = require('../../models/Location'),
	routes = require('../../config').routes;


// INDEX route
router.get('/', function(req, res) {
	Location.find({}, function(err, locations) {
		if (err) {
			res.flash('error', err.message);
			res.redirect(routes.admin);
		} else {
			res.render('admin/locations/index', {
				locations: locations
			});
		}
	});
});

// NEW route
router.get('/new', function(req, res) {
	res.render('admin/locations/new');
});

// CREATE route
router.post('/', function(req, res) {
	Location.create(req.body.location, function(err, location) {
		if (err) {
			req.flash('error', 'Error creating new location: ' + err.message);
			console.log(err);
			res.redirect(routes.locations);
		} else {
			req.flash('success', 'Location named: ' + location.name + ' created!');
			res.redirect(routes.locations);
		}
	});
});

// EDIT route
router.get('/:id/edit', function(req, res) {
	Location.findById(req.params.id, function(err, location) {
		if (err) {
			req.flash('error', err.message);
			res.redirect(routes.locations);
		} else {
			res.render('admin/locations/edit', {
				location: location
			})
		}
	});
});

// UPDATE route
router.put('/:id', function(req, res) {
	Location.findByIdAndUpdate(req.params.id, req.body.location, { runValidators: true }, function(err, location) {
		if (err) {
			req.flash('error', 'Error editing location: ' + err.message);
		} else {
			req.flash('success', 'Location: ' + location.name + ' updated!');
		}
		res.redirect(routes.locations);
	});
});

// DESTROY route
router.delete('/:id', function(req, res) {
	Location.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			req.flash('error', err.message);
		} else {
			req.flash('success', 'Location removed');
		}
		res.redirect(routes.locations);
	});
});

module.exports = router;
