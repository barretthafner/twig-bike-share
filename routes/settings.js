var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware"),
    Setting     = require("../models/Setting");


// INDEX route
router.get("/", middleware.isLoggedIn, function(req, res) {
  Setting.getAllSettings(true, function(settings) {
    res.render("settings/index", {settings: settings});
  });
});

// EDIT route
router.get("/:setting_id/edit", middleware.isLoggedIn, function (req, res) {
  Setting.findById(req.params.setting_id, function (err, setting) {
    if (err) {
      console.log(err);
    } else {
      res.render("settings/edit", { setting: setting })
    }
  });
});

// UPDATE route
router.put("/:setting_id", middleware.isLoggedIn, function (req, res) {
  Setting.findByIdAndUpdate(req.params.setting_id, req.body.setting, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/settings");
    }
  });
});

module.exports = router;