var express     = require("express"),
    router      = express.Router(),
    middleware = require("../middleware"),
    mailer = require("../modules/mailgun");

router.get("/", middleware.isLoggedIn ,function(req, res){

  mailer.sendTest();

  res.render("mailer");
});

module.exports = router;
