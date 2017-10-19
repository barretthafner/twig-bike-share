'use strict';
var Administrator = require('./models/Administrator');
var Bike = require('./models/Bike');
var Subscriber = require('./models/Subscriber');
var SubscriberGroup = require('./models/SubscriberGroup');
var twilio = require('./modules/twilio');

var administratorData = [{
	name: 'WTA Admin',
	username: 'bikeshare@wta-tma.org',
	password: 'bikes'
}];

var bikeData =
	[{
		'bikeId': 10,
		'code': '1455',
		'active': true
	}, {
		'bikeId': 11,
		'code': '3056',
		'active': true
	}, {
		'bikeId': 12,
		'code': '8897',
		'active': true
	}, {
		'bikeId': 13,
		'code': '3256',
		'active': true
	}, {
		'bikeId': 14,
		'code': '7235',
		'active': true
	}, {
		'bikeId': 15,
		'code': '8991',
		'active': true
	}, {
		'bikeId': 16,
		'code': '7657',
		'active': true
	}, {
		'bikeId': 17,
		'code': '4899',
		'active': true
	}, {
		'bikeId': 18,
		'code': '2008',
		'active': true
	}, {
		'bikeId': 19,
		'code': '1212',
		'active': false
	}];

var subscriberGroupData =
	[{
		'groupName': 'WTA Bikeshare',
		'emailDomain': '@wta-tma.org',
		'signUpSlug': 'wta',
		'repairEmail': 'bikeshare@wta-tma.org',
		'logoSrc': '/img/OBI_logo_web.png',
		'legalText': 'A bunch of legal mumbojumbo for you to ignore and just blindly agree to...',
		'hidden': false
	}];

var subscriberData =
	[
		{
			'firstName': 'Test',
			'lastName': 'User',
			'email': 'bikeshare@wta-tma.org'
		}
	];

function seed(config) {

	if (config.administrators === true) {
		Administrator.remove({}, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('removed administrators!');
				administratorData.forEach(function(administrator) {
					var newAdministrator = new Administrator({
						name: administrator.name,
						username: administrator.username
					});
					Administrator.register(newAdministrator, administrator.password, function(err, administrator) {
						if (err) {
							console.log(err);
						} else {
							console.log('added administrator: ' + administrator.username);
						}
					});
				});
			}
		});
	}


	if (config.bikes === true) {
		//clear and load bikes
		Bike.remove({}, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('removed bikes!');
				bikeData.forEach(function(bike) {
					Bike.create(bike, function(err, bike) {
						if (err) {
							console.log(err);
						} else {
							console.log('added bike: ' + bike.bikeId);
						}
					});
				});
			}
		});
	}

	if (config.subscriberGroups === true) {
		//clear and load subscriber groups
		SubscriberGroup.remove({}, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('removed subscriber groups!');
				subscriberGroupData.forEach(function(subscriberGroup) {
					SubscriberGroup.create(subscriberGroup, function(err, subscriberGroup) {
						if (err) {
							console.log(err);
						} else {
							console.log('added subscriber group: ' + subscriberGroup.groupName);
							subscriberData.forEach(function(subscriber) {
								Subscriber.addNew(subscriber, subscriberGroup, function(err, subscriber) {
									if (err) {
										console.log(err);
									} else {
										subscriberGroup.subscribers.push(subscriber);
										subscriberGroup.save();
										console.log(subscriber);
										console.log('added subscriber: ' + subscriber.email + ' to subscriber group: ' + subscriberGroup.groupName);
									}
								});
							});
						}
					});
				});
			}
		});
	}

	if (config.twilio === true) {
		// set twilio endpoints
		twilio.setEndpoints();
	}
}

module.exports = seed;
