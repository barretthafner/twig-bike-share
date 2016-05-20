var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware"),
    BikeUser    = require("../models/BikeUser");


// Index route
router.get("/", middleware.isLoggedIn, function(req, res) {
  BikeUser.find({}, function(err, bikeUsers){
    if (err) {
      console.log(err);
      res.redirect("/admin");
    } else {
      res.render("bikeUsers/index", {bikeUsers: bikeUsers});
    }
  });
});

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("bikeUsers/new");
});

// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res){
  BikeUser.create(req.body.bikeUser, function(err){
    if(err) {
      console.log(err);
      res.redirect("/bike-users");
    } else {
      res.redirect("/bike-users");
    }
  });
});

// DESTROY route
router.delete("/:id", middleware.isLoggedIn, function(req, res){
  BikeUser.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log(err);
      res.redirect("/bike-users");
    } else {
      res.redirect("/bike-users");
    }
  });
});

module.exports = router;
