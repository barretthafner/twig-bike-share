var express     = require("express"),
    router      = express.Router(),
    middleware = require("../middleware");

var Setting = require("../models/Setting");

// EDIT Route
router.get("/edit", middleware.isLoggedIn ,function(req, res){
  Setting.getByKey("inviteHTML", function(err, setting) {
    if (err) {
      res.redirect("/subscribers");
    } else {
      res.render("invite/edit", {setting: setting});
    }
  });
});

// UPDATE route
router.put("/:id", middleware.isLoggedIn, function (req, res) {
  Setting.findByIdAndUpdate(req.params.bike_id, req.body.bike, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/bikes");
    }
  });
});

module.exports = router;
