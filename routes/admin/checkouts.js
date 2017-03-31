'use strict';
var express = require('express');
var router = express.Router();

var stringify = require('csv-stringify');

var Checkout = require('../../models/Checkout');
var routes = require('../../config').routes;


router.get('/', function(req, res) {
	res.render('admin/checkouts/index');
});

// Download data route
router.post('/', function(req, res) {
	Checkout.find({})
		.populate('bike', 'bikeId')
		.populate('subscriber', 'email')
		.exec(function(err, checkouts) {
			if (err) {
				req.flash('error', err.message);
				res.redirect(routes.checkouts);
			} else {
				var data = checkouts.map(function(checkout) {
					return {
						time: (new Date(checkout.timestamp)).toLocaleString(),
						bike: checkout.bike.bikeId,
						subscriber: checkout.subscriber.email
					}
				});
				stringify(data, { header: true }, function(err, output) {
					if (err) {
						req.flash('error', err.message);
						res.redirect(routes.checkouts);
					} else {
						res.attachment('checkouts_' + Date.now() + '.csv');
						res.status(200).send(output);
					}
				});
			}
	});
});

module.exports = router;
