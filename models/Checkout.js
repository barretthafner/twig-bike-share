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
	return this.create(newCheckout, function(err, checkout) { callback(err, checkout) });
}

CheckoutSchema.statics.listWithin30DaysOf = function(date, callback) {

	return this.find({
		'timestamp': {
			$lt: moment(date).endOf('day').toDate(),
			$gt: moment(date).subtract(30, 'days').startOf('day').toDate()
		}
	}, callback);
};

// export
module.exports = mongoose.model('Checkout', CheckoutSchema);
