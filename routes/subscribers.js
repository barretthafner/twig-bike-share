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

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("subscribers/new");
});

// NEW BULK route
router.get("/bulk", middleware.isLoggedIn, function(req, res){
  res.render("subscribers/bulk");
});


// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res){

  var subscriber = req.body.subscriber;
  subscriber.validationCode = validationCode.generate();
  subscriber.active = false;
  subscriber.invited = false;

  Subscriber.create(subscriber, function(err){
    if(err) {
      console.log(err);
    }
    res.redirect("/subscribers");
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
  if (subscriber.invited) {
    subscriber.invited = true;
  } else {
    subscriber.invited = false;
  }

  Subscriber.findByIdAndUpdate(req.params.id, req.body.subscriber, function(err){
    if (err) {
      console.log(err);
    }
    res.redirect("/subscribers");
  })
});

// DESTROY route
router.delete("/:id", middleware.isLoggedIn, function(req, res){
  Subscriber.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log(err);
    }
    res.redirect("/subscribers");
  });
});


// Invite Subscriber route
router.get("/invite/:id", middleware.isLoggedIn, function (req, res) {
  Subscriber.findById(req.params.id, function(err, subscriber) {
    if (err) {
      console.log(err);
      //flash : err
      res.redirect("/subscribers");
    } else if (!subscriber.invited) {
      var params = {
        from: "NoReply <noreply@openbike.hafnerindustries.com>",
        to: subscriber.emailString(),
        subject: "Welcome to the Open Bike Project",
        text: "Test text",
        html: "<h1>Test @ " + (new Date).toUTCString() + "</h1>"
      };
      mailer.sendOne(params, function(err) {
        if (err) {
          console.log(err);
          res.redirect("/subscribers");
        } else {
          subscriber.invited = true;
          subscriber.save(function(){
            res.redirect("/subscribers");
          });
        }
      });
    } else {
      // flash: subscriber has been invited already
      res.redirect("/subscribers");
    }
  });

});

module.exports = router;
