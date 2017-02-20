'use strict';
var express = require('express'),
	router = express.Router(),
	middleware = require('../../middleware'),
	Bike = require('../../models/Bike'),
	routes = require('../tree');


// INDEX route
router.get('/', middleware.isLoggedIn, function(req, res) {
	Bike.find({}, function(err, bikes) {
		if (err) {
			console.log(err);
			res.redirect(routes.admin);
		} else {
			res.render('bikes/index', {
				bikes: bikes
			});
		}
	});
});

// NEW route
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('bikes/new');
});

// CREATE route
router.post('/', middleware.isLoggedIn, function(req, res) {
	Bike.create(req.body.bike, function(err) {
		if (err) {
			console.log(err);
			res.redirect(routes.bikes);
		} else {
			res.redirect(routes.bikes);
		}
	});
});

// EDIT route
router.get('/:bike_id/edit', middleware.isLoggedIn, function(req, res) {
	Bike.findById(req.params.bike_id, function(err, bike) {
		if (err) {
			console.log(err);
		} else {
			res.render('bikes/edit', {
				bike: bike
			})
		}
	});
});

// UPDATE route
router.put('/:bike_id', middleware.isLoggedIn, function(req, res) {
	Bike.findByIdAndUpdate(req.params.bike_id, req.body.bike, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect(routes.bikes);
		}
	});
});

// DESTROY route
router.delete('/:bike_id', middleware.isLoggedIn, function(req, res) {
	Bike.findByIdAndRemove(req.params.bike_id, function(err) {
		if (err) {
			console.log(err);
			res.redirect(routes.bikes);
		} else {
			res.redirect(routes.bikes);
		}
	});
});

module.exports = router;
