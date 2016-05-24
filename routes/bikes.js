var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware"),
    Bike        = require("../models/Bike");


// INDEX route
router.get("/", middleware.isLoggedIn, function(req, res) {
  Bike.find({}, function(err, bikes){
    if (err) {
      console.log(err);
      res.redirect("/admin");
    } else {
      res.render("bikes/index", {bikes: bikes});
    }
  });
});

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("bikes/new");
});

// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res){
  Bike.create(req.body.bike, function(err){
    if(err) {
      console.log(err);
      res.redirect("/bikes");
    } else {
      res.redirect("/bikes");
    }
  });
});

// DESTROY route
router.delete("/:id", middleware.isLoggedIn, function(req, res){
  Bike.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log(err);
      res.redirect("/bikes");
    } else {
      res.redirect("/bikes");
    }
  });
});


module.exports = router;
