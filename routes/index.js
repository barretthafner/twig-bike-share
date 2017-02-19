var express = require("express"),
	router = express.Router();

// Connect routes
var adminRoutes = require("./admin"),
	bikeRoutes = require("./admin/bikes"),
	subscriberRoutes = require("./admin/subscribers"),
	userRoutes = require("./admin/users"),
	apiRoutes = require("./api"),
	inviteRoutes = require("./admin/invite");

// Root ("/") route
router.get("/", function(req, res) {
		res.render("index");
});

router.use("/a", adminRoutes);
router.use("/a/bikes", bikeRoutes);
router.use("/a/subscribers", subscriberRoutes);
router.use("/a/users", userRoutes);
router.use("/a/invite", inviteRoutes);

router.use("/api", apiRoutes);

router.get("*", function(req, res) {
	res.render("404");
});

module.exports = router;
