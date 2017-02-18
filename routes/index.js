var express = require("express"),
	router = express.Router();

// Connect routes
var rootRoutes = require("./root"),
	adminRoutes = require("./admin"),
	bikeRoutes = require("./bikes"),
	subscriberRoutes = require("./subscribers"),
	userRoutes = require("./users"),
	apiRoutes = require("./api"),
	inviteRoutes = require("./invite");

router.use("/", rootRoutes);
router.use("/admin", adminRoutes);
router.use("/bikes", bikeRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/users", userRoutes);
router.use("/api", apiRoutes);
router.use("/invite", inviteRoutes);

router.get("*", function(req, res) {
	res.render("404");
});

module.exports = router;
