'use strict';
var mongoose = require('mongoose');
var Administrator = require('./models/Administrator');
var Bike = require('./models/Bike');
var Subscriber = require('./models/Subscriber');
var SubscriberGroup = require('./models/SubscriberGroup');
var Setting = require('./models/Setting');
var validationCode = require('./modules/validationCode');
var twilio = require('./modules/twilio');

var administratorData = [{
	name: 'WTA Admin',
	username: 'bikeshare@wta-tma.org',
	password: 'bikes'
}];

var bikeData =
	[{
		'bikeId': 10,
		'code': '1455'
	}, {
		'bikeId': 11,
		'code': '3056'
	}, {
		'bikeId': 12,
		'code': '8897'
	}, {
		'bikeId': 13,
		'code': '3256'
	}, {
		'bikeId': 14,
		'code': '7235'
	}, {
		'bikeId': 15,
		'code': '8991'
	}, {
		'bikeId': 16,
		'code': '7657'
	}, {
		'bikeId': 17,
		'code': '4899'
	}, {
		'bikeId': 18,
		'code': '2008'
	}, {
		'bikeId': 19,
		'code': '1212'
	}];

var subscriberGroupData =
	[{
		'groupName': 'Open Bike Initiative',
		'emailDomain': '@openbikeinitiative.com',
		'signUpSlug': 'open-bike-initiative',
		'logoSrc': '/img/OBI_logo_web.png'
	}];

var subscriberData =
	[{
			'firstName': 'Test',
			'lastName': 'User',
			'email': 'barrett@hafnerindustries.com'
		}
		// { 'firstName': 'Steve', 'lastName': 'Zissou', 'email': 'thezissou@thesea.com',  }
		// { 'firstName': 'Charley', 'lastName': 'Murphy', 'email': 'charley@themurphys.com', 'phoneNumber': '6024458890' },
		// { 'firstName': 'George', 'lastName': 'Costanza', 'email': 'georgelikeshischickenspicy@mail.com', 'phoneNumber': '9908804556' },
		// { 'firstName': 'Marcell', 'lastName': 'Wallace', 'email': 'marcelman@gmail.net', 'phoneNumber': '9094402756' },
		// { 'firstName': 'Mark', 'lastName': 'Misky', 'email': 'bikesalot@oregonbikes.com', 'phoneNumber': '3034158233' },
		// { 'firstName': 'Alisha', 'lastName': 'Stone', 'email': 'alisha.stone@privatemail.com', 'phoneNumber': '8479883211' },
		// { 'firstName': 'Courtney', 'lastName': 'Manson', 'email': 'cmanson@edusite.edu', 'phoneNumber': '4041443556' },
		// { 'firstName': 'Jeremy', 'lastName': 'York', 'email': 'thenewyork@corgis.net', 'phoneNumber': '4157078737' },
		// { 'firstName': 'Melissa', 'lastName': 'Barnes', 'email': 'xxemogirlxx@yahoo.net', 'phoneNumber': '7143345222' }
	];

var settingData =
	[{
		'key': 'inviteHtml',
		'value': '<p>Invite HTML not set!</p>'
	}];

// <h1>Welcome to the Open Bike Project</h1>
// <p>You have been officially invited to participate in open source bike sharing! Please read the below Agreement, and if you agree follow the instructions.</p>
// <h2>Open Bike Share Agreement</h2>
// <h3><u>Bikes must be returned by 10am the following business day to either the CHH or CLSB station.</u></h3>
// <hr>
// <h4>You agree to follow all local bicycle riding rules:</h4>
// <ul>
// <li><strong>ASSUMPTION OF RISK:</strong> I am aware that quick release mechanisms, brakes, and other parts of the Equipment will not function as optimally intended at all times and under all circumstances, and may be adversely affected by inclement weather conditions, moisture, terrain, and the like. I am aware that cycling involves risks, dangers and hazards including, but not limited to: mechanical and structural failure of the Equipment; changing weather conditions; variation or steepness in terrain; difficulty or inability to control one’s speed and direction; loss of balance; rapid or uncontrolled acceleration on hills and inclines; collision with exposed rock, earth, trees, or other natural or man-made objects; collision with pedestrians, vehicles or other cyclists; changes or variations in the cycling surface; failure to cycle safely or within one’s own ability; negligence of other cyclists; and NEGLIGENCE ON THE PART OF Open Bike LLC, ITS MEMBERS, EMPLOYEES, AGENTS, AND/OR SERVANTS</li>
// <li>I UNDERSTAND THAT MY USE OF THE EQUIPMENT, INCLUDING SAFETY EQUIPMENT, CANNOT GUARANTEE MY SAFETY OR FREEDOM FROM INJURY WHILE CYCLING. I AM AWARE THAT IT IS NOT POSSIBLE TO PREDICT EVERY CONDITION OR CIRCUMSTANCE UNDER WHICH THE EQUIPMENT AND SAFETY EQUIPMENT WILL NOT OPERATE AS INTENDED. I FREELY ACCEPT AND FULLY ASSUME ALL SUCH RISKS, DANGERS, AND HAZARDS, AND THE RESPONSIBILITY FOR PERSONAL INJURY, DEATH, PROPERTY DAMAGE, AND LOSS RESULTING THEREFROM.</li>
// <ol>
// <li>To waive any and all claims that I have or may in the future have against Open Bike LLC its members, directors, officers, employees, agents, and/or servants, and TO RELEASE THE RELEASEES from any and all liability for any loss, damage, expense or injury including death that I may suffer, or that my next of kin may suffer, resulting from or arising out of any aspects of my use of the Equipment, DUE TO ANY CAUSE WHATSOEVER, INCLUDING NEGLIGENCE, BREACH OF CONTRACT OR BREACH OF WARRANTY ON THE PART OF THE RELEASEES in respect of the design, manufacture, selection, installation, maintenance, inspection, service or repair of the Equipment, or in respect of the provision of or the failure to provide any warnings, direction, instructions or guidance as to the use of the Equipment. THERE ARE NO WARRANTIES, EXPRESS OR IMPLIED, CONCERNING THE EQUIPMENT LISTED ON THIS FORM;</li>
//
// <li>TO HOLD HARMLESS AND INDEMNIFY THE RELEASEES from any and all liability from any damage to property of or personal injury to any third party, resulting from my use of the Equipment;</li>
//
// <li>This Agreement shall be effective and binding upon my heirs, next of kin, executors, administrators and representatives, in the event of my death or incapacity;</li>
//
// <li>This Agreement and any rights, duties and obligations as between the parties to this Agreement shall be governed by and interpreted solely in accordance with the laws of the State of Oregon and no other jurisdiction; and</li>
//
// <li>Any litigation involving the parties to this Agreement shall be brought solely within the State of Oregon and shall be within the exclusive jurisdiction of the Courts of the State of Oregon.</li>
// </ol>
// <p>Do you agree to follow the Open Bike Share User Agreement? </p>
// <p>BY SELECTING YES YOU ARE AGREEING THAT: I HAVE READ AND UNDERSTAND THIS AGREEMENT AND SIGN IT FREELY, VOLUNTARILY, AND WITH KNOWLEDGE OF ITS CONTENTS. I AM AWARE THAT BY SIGNING THIS AGREEMENT, I AM WAIVING CERTAIN LEGAL RIGHTS WHICH I OR MY HEIRS, NEXT OF KIN, EXECUTORS, ADMINISTRATORS,AND/OR REPRESENTATIVES MAY HAVE AGAINST THE RELEASEES.<p>

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
					SubscriberGroup.createWithUrl(subscriberGroup, function(err, subscriberGroup) {
						if (err) {
							console.log(err);
						} else {
							console.log('added subscriber group: ' + subscriberGroup.groupName);
							subscriberData.forEach(function(subscriber) {
								Subscriber.addNew(subscriber, function(err, subscriber) {
									if (err) {
										console.log(err);
									} else {
										subscriberGroup.subscribers.push(subscriber);
										subscriberGroup.save();
										console.log(subscriber);
										console.log('added subscriber: ' + subscriber.email + ' to subscriber group: ' + subscriberGroup.groupName);
									}
								})
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
};

module.exports = seed;
