'use strict';
// Checkout model
// Stores bike checkout
var mongoose = require('mongoose');

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

// export
module.exports = mongoose.model('Checkout', CheckoutSchema);
