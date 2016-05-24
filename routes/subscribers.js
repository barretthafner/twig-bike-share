var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware"),
    Subscriber    = require("../models/Subscriber");


// INDEX route
router.get("/", middleware.isLoggedIn, function(req, res) {
  Subscriber.find({}, function(err, subscribers){
    if (err) {
      console.log(err);
      res.redirect("/admin");
    } else {
      res.render("subscribers/index", {subscribers: subscribers});
    }
  });
});

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("subscribers/new");
});

// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res){
  Subscriber.create(req.body.subscriber, function(err){
    if(err) {
      console.log(err);
      res.redirect("/subscribers");
    } else {
      res.redirect("/subscribers");
    }
  });
});

// DESTROY route
router.delete("/:id", middleware.isLoggedIn, function(req, res){
  Subscriber.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log(err);
      res.redirect("/subscribers");
    } else {
      res.redirect("/subscribers");
    }
  });
});

module.exports = router;
