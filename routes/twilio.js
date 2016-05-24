var express     = require("express"),
    router      = express.Router(),
    middleware = require("../middleware"),
    twilioClient = require("../twilioClient");


router.get("/test", middleware.isLoggedIn ,function(req, res){
  twilioClient.sendSms("+15415433572", "hello world");
  res.render("twilio/test");
});

module.exports = router;
