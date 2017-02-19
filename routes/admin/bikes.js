var express = require("express"),
	router = express.Router(),
	middleware = require("../../middleware"),
	Bike = require("../../models/Bike");


// INDEX route
router.get("/", middleware.isLoggedIn, function(req, res) {
	Bike.find({}, function(err, bikes) {
		if (err) {
			console.log(err);
			res.redirect("/admin");
		} else {
			res.render("bikes/index", {
				bikes: bikes
			});
		}
	});
});

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("bikes/new");
});

// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res) {
	Bike.create(req.body.bike, function(err) {
		if (err) {
			console.log(err);
			res.redirect("/bikes");
		} else {
			res.redirect("/bikes");
		}
	});
});

// EDIT route
router.get("/:bike_id/edit", middleware.isLoggedIn, function(req, res) {
	Bike.findById(req.params.bike_id, function(err, bike) {
		if (err) {
			console.log(err);
		} else {
			res.render("bikes/edit", {
				bike: bike
			})
		}
	});
});

// UPDATE route
router.put("/:bike_id", middleware.isLoggedIn, function(req, res) {
	Bike.findByIdAndUpdate(req.params.bike_id, req.body.bike, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/bikes");
		}
	});
});

// DESTROY route
router.delete("/:bike_id", middleware.isLoggedIn, function(req, res) {
	Bike.findByIdAndRemove(req.params.bike_id, function(err) {
		if (err) {
			console.log(err);
			res.redirect("/bikes");
		} else {
			res.redirect("/bikes");
		}
	});
});

module.exports = router;
