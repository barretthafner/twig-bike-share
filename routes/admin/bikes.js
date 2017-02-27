'use strict';
var express = require('express'),
	router = express.Router(),
	Bike = require('../../models/Bike'),
	routes = require('../../config').routes;


// INDEX route
router.get('/', function(req, res) {
	Bike.find({}, function(err, bikes) {
		if (err) {
			req.flash('error', err.message);
			res.redirect(routes.admin);
		} else {
			res.render('admin/bikes/index', {
				bikes: bikes
			});
		}
	});
});

// NEW route
router.get('/new', function(req, res) {
	res.render('admin/bikes/new');
});

// CREATE route
router.post('/', function(req, res) {
	Bike.create(req.body.bike, function(err, bike) {
		if (err) {
			req.flash('error', err.message);
			console.log(err);
			res.redirect(routes.bikes);
		} else {
			req.flash('success', 'Bike #' + bike.bikeId + ' created!');
			res.redirect(routes.bikes);
		}
	});
});

// EDIT route
router.get('/:id/edit', function(req, res) {
	Bike.findById(req.params.id, function(err, bike) {
		if (err) {
			console.log(err);
		} else {
			res.render('admin/bikes/edit', {
				bike: bike
			})
		}
	});
});

// UPDATE route
router.put('/:id', function(req, res) {
	Bike.findByIdAndUpdate(req.params.id, req.body.bike, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect(routes.bikes);
		}
	});
});

// DESTROY route
router.delete('/:id', function(req, res) {
	Bike.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			console.log(err);
			res.redirect(routes.bikes);
		} else {
			res.redirect(routes.bikes);
		}
	});
});

module.exports = router;
