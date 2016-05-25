var express      = require("express"),
    router       = express.Router(),
    config       = require("../config");
    middleware   = require("../middleware"),
    twilio       = require("twilio"),
    twilioClient = require("../twilioClient");

router.post("/voice/incoming", function(req, res){
  if (twilio.validateExpressRequest(req, config.authToken)){
    var resp = new twilio.TwimlResponse();
    resp.reject;
  }
  else {
      res.status(403).send('you are not twilio. Buzz off.');
  }
});

router.post("/voice/incoming", function(req, res){
  if (twilio.validateExpressRequest(req, config.authToken)){
    var resp = new twilio.TwimlResponse();
    resp.reject;
  }
  else {
      res.status(403).send('you are not twilio. Buzz off.');
  }
});

router.get("/test", middleware.isLoggedIn ,function(req, res){
  twilioClient.sendSms("+5415433572", "hello world");
  res.render("twilio/test");
});

module.exports = router;
