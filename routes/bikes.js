var express = require("express");
    router = express.Router();
    Bike = require("../models/Bike");
    middleware = require("../middleware");

// Index route
router.get("/", function(req, res) {
  Bike.find({}, function(err, bikes){
    if (err) {
      console.log(err);
      res.redirect("/admin");
    } else {
      res.render("bikes/index", {bikes: bikes});
    }
  });
});


module.exports = router;
