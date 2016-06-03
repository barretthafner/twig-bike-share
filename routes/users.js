var express     = require("express"),
  router      = express.Router(),
  middleware  = require("../middleware"),
  User        = require("../models/User");


// INDEX route
router.get("/", middleware.isLoggedIn, function(req, res) {
  User.find({}, function(err, users){
    if (err) {
      console.log(err);
      res.redirect("/admin");
    } else {
      res.render("users/index", {users: users});
    }
  });
});

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("users/new");
});

// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res){
  User.create(req.body.user, function(err){
    if(err) {
      console.log(err);
      res.redirect("/users");
    } else {
      res.redirect("/users");
    }
  });
});

// EDIT route
router.get("/:user_id/edit", middleware.isLoggedIn, function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render("users/edit", { user: user })
    }
  });
});

// UPDATE route
router.put("/:user_id", middleware.isLoggedIn, function (req, res) {
  User.findByIdAndUpdate(req.params.user_id, req.body.user, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/users");
    }
  });
});

// DESTROY route
router.delete("/:user_id", middleware.isLoggedIn, function(req, res){
  User.findByIdAndRemove(req.params.user_id, function(err){
    if (err){
      console.log(err);
      res.redirect("/users");
    } else {
      res.redirect("/users");
    }
  });
});

module.exports = router;
