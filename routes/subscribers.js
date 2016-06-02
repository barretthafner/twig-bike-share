var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware"),
    validationCode     = require("../modules/validationCode"),
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

// INVITE route
router.get("/invite", middleware.isLoggedIn, function(req, res){
  res.render("subscribers/invite");
});

// SEND INVITATION route
router.post("/", middleware.isLoggedIn, function(req, res){

  var subscriber = req.body.subscriber;
  subscriber.validationCode = validationCode.generate();
  subscriber.active = false;

  Subscriber.create(subscriber, function(err){
    if(err) {
      console.log(err);
      res.redirect("/subscribers");
    } else {
      res.redirect("/subscribers");
    }
  });
});

// EDIT route
router.get("/:id/edit", middleware.isLoggedIn, function (req, res) {
  Subscriber.findById(req.params.id, function(err, subscriber) {
    if (err) {
      console.log(err);
    } else {
      res.render("subscribers/edit", {subscriber: subscriber});
    }
  });
});

// UPDATE route
router.put("/:id", middleware.isLoggedIn, function (req, res){
  Subscriber.findByIdAndUpdate(req.params.id, function(err){
    if (err) {
      console.log(err);
      res.redirect("/subscribers");
    } else {
      res.redirect("/subscribers");
    }
  })
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
