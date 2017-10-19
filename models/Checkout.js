'use strict';
// Checkout model
// Stores bike checkout
var mongoose = require('mongoose');
var moment = require('moment');

var CheckoutSchema = new mongoose.Schema({
	subscriber: {
		type: String,
		required: [true, 'Subscriber is required'],
	},
	bike: {
		type: String,
		required: [true, 'Bike is required'],
		ref: 'Bike'
	},
	location: {
		type: String,
		ref: 'Location'
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

CheckoutSchema.statics.addNew = function(subscriber, bike, location, callback) {
	var newCheckout = {
		subscriber: subscriber.id,
		bike: bike.bikeId,
		location: location ? location.code : null
	};
	return this.create(newCheckout, function(err, checkout) { callback(err, checkout); });
};

CheckoutSchema.statics.listWithin30DaysOf = function(date, callback) {

	return this.find({
		'timestamp': {
			$lt: moment(date).endOf('day').toDate(),
			$gt: moment(date).subtract(30, 'days').startOf('day').toDate()
		}
	}, function(err, checkouts) {
		if (err) callback(err);
		else {

			// create an array of 30 objects with labels for each day
			var checkoutCounter = Array.apply(null, new Array(31)).map(function(x, index) {
				return {
					label: moment(date).startOf('day').subtract(index, 'days').format('MMM D'),
					count: 0
				};
			});

			// for each checkout found increment the count for that day
			checkouts.forEach(function(checkout) {
				var checkoutDay = moment(checkout.timestamp).startOf('day');
				var daysAgo = moment.duration(moment(date).startOf('day').diff(checkoutDay)).asDays();
				if (daysAgo <= 30) checkoutCounter[daysAgo].count++;
			});

			callback(null, checkoutCounter.reverse());
		}
	});
};

// export
module.exports = mongoose.model('Checkout', CheckoutSchema);
