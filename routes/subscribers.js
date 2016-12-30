var express = require("express"),
	router = express.Router(),
	middleware = require("../middleware"),
	config = require("../config"),
	validationCode = require("../modules/validationCode"),
	mailer = require("../modules/mailgun"),
	Setting = require("../models/Setting"),
	Subscriber = require("../models/Subscriber");


// INDEX route
router.get("/", middleware.isLoggedIn, function(req, res) {
	Subscriber.find({}, function(err, subscribers) {
		if (err) {
			console.log(err);
			res.redirect("/admin");
		} else {
			res.render("subscribers/index", {
				subscribers: subscribers
			});
		}
	});
});

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("subscribers/new");
});

// NEW BULK route
router.get("/bulk", middleware.isLoggedIn, function(req, res) {
	res.render("subscribers/bulk");
});


// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res) {

	var subscriber = req.body.subscriber;
	subscriber.validationCode = validationCode.generate();
	subscriber.active = false;
	subscriber.invited = false;

	Subscriber.create(subscriber, function(err) {
		if (err) {
			console.log(err);
		}
		res.redirect("/subscribers");
	});
});

// EDIT route
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
	Subscriber.findById(req.params.id, function(err, subscriber) {
		if (err) {
			console.log(err);
		} else {
			res.render("subscribers/edit", {
				subscriber: subscriber
			});
		}
	});
});

// UPDATE route
router.put("/:id", middleware.isLoggedIn, function(req, res) {
	var subscriber = req.body.subscriber;
	if (subscriber.active) {
		subscriber.active = true;
	} else {
		subscriber.active = false;
	}
	if (subscriber.invited) {
		subscriber.invited = true;
	} else {
		subscriber.invited = false;
	}

	Subscriber.findByIdAndUpdate(req.params.id, req.body.subscriber, function(err) {
		if (err) {
			console.log(err);
		}
		res.redirect("/subscribers");
	})
});

// DESTROY route
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
	Subscriber.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			console.log(err);
		}
		res.redirect("/subscribers");
	});
});


// Invite All Uninvited
router.get("/invite", middleware.isLoggedIn, function(req, res) {

	Subscriber.find({}, function(err, subscribers) {
		if (err) {
			console.log("1", err);
			//flash : err
			res.redirect("/subscribers");
		} else {
			var process = new Promise(function(resolve, reject) {
				resolve(1);
			});
			process.then(function() {
				subscribers.forEach(function(subscriber) {
					if (!subscriber.invited) {
						var params = {
							to: subscriber.emailString(),
							subject: "Welcome to the Open Bike Project",
							text: "Test text",
							html: "<h1>Test @ " + (new Date).toUTCString() + "</h1><h2>" + subscriber.validationCode + "</h2>"
						};
						mailer.sendOne(params, function(err) {
							if (err) {
								console.log("2", err);
							} else {
								subscriber.invited = true;
								subscriber.save();
							}
						});
					}
				});
			}).then(function() {
				res.redirect("/subscribers");
			});
		}
	});
});

// Invite Subscriber route
router.get("/:id/invite", middleware.isLoggedIn, function(req, res) {

	var inviteHtml;
	Setting.findByKey("inviteHtml", function(err, setting) {
		if (err) {
			console.log(err);
			res.redirect("/subscribers");
		} else {
			inviteHtml = setting.value;
		}
	});

	Subscriber.findById(req.params.id, function(err, subscriber) {
		if (err || !inviteHtml) {
			console.log(err);
			//flash : err
			res.redirect("/subscribers");
		} else if (!subscriber.invited) {


			var emailHtml = "<h1>Test @ " + (new Date).toUTCString() + "</h1>" + inviteHtml + "<h2>Text your validation code: <a href='sms://" + config.twilioSendingNumber + "&body=" + subscriber.validationCode + "'>" + subscriber.validationCode + "</a> to: " + config.twilioSendingNumber + "</h2>"

			var params = {
				from: config.mailgunFromEmail,
				to: subscriber.emailString(),
				subject: config.inviteSubject,
				text: emailHtml.replace(/<(?:.|\n)*?>/gm, ''),
				html: emailHtml
			};
			mailer.sendOne(params, function(err) {
				if (err) {
					console.log(err);
					res.redirect("/subscribers");
				} else {
					subscriber.invited = true;
					subscriber.save(function() {
						res.redirect("/subscribers");
					});
				}
			});
		} else {
			// flash: subscriber has been invited already
			res.redirect("/subscribers");
		}
	});
});



module.exports = router;
