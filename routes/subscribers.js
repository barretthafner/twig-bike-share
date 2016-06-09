var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware"),
    validationCode     = require("../modules/validationCode"),
    mailer = require("../modules/mailgun"),
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

// INVITE NEW route
router.get("/invite/new", middleware.isLoggedIn, function(req, res){
  res.render("subscribers/invite");
});

router.get("/invite/:id", middleware.isLoggedIn, function (req, res) {
  Subscriber.findById(req.params.id, function(err, subscriber) {
    if (err) {
      console.log(err);
    } else {
      if (!subscriber.invited) {
        var params = {
          from: "NoReply <noreply@openbike.hafnerindustries.com>",
          to: subscriber.emailString(),
          subject: "Welcome to the Open Bike Project",
          text: "Test text",
          html: "<h1>Test HTML</h1>"
        };
        mailer.sendOne(params);
        subscriber.invited = true;
        subscriber.save();
      }
    }
  });
  res.redirect("/subscribers");
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
  var subscriber = req.body.subscriber;
  if (subscriber.active) {
    subscriber.active = true;
  } else {
    subscriber.active = false;
  }

  Subscriber.findByIdAndUpdate(req.params.id, req.body.subscriber, function(err){
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
