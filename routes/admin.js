var express     = require("express"),
    router      = express.Router(),
    middleware = require("../middleware");

// Admin panel
router.get("/", middleware.isLoggedIn ,function(req, res){
  res.render("admin");
});

module.exports = router;
