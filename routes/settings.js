var express     = require("express"),
  router      = express.Router(),
  middleware  = require("../middleware"),
  Setting     = require("../models/Setting");

// EDIT route
router.get("/", middleware.isLoggedIn, function (req, res) {
  Setting.find("", function (err, settings) {
    if (err) {
      console.log(err);
    } else {
      res.render("settings", { settings: settings })
    }
  });
});

// UPDATE route
router.put("/:bike_id", middleware.isLoggedIn, function (req, res) {
  Bike.findByIdAndUpdate(req.params.bike_id, req.body.bike, function (err, bike) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/bikes");
    }
  });
});

module.exports = router;