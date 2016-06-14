// admin routes
// contains routes for the main admin page
// requires user to be logged in

var express     = require("express"),
    router      = express.Router(),
    middleware = require("../middleware");

// Admin panel
router.get("/", middleware.isLoggedIn ,function(req, res){
  res.render("admin");
});

module.exports = router;
