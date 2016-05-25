var express      = require("express"),
    router       = express.Router(),
    config       = require("../../config");
    middleware   = require("../../middleware"),
    twilio       = require("twilio"),
    twilioClient = require("../../modules/twilio/twilioClient");

router.post("/voice/incoming", function(req, res){
  if (twilio.validateExpressRequest(req, config.authToken)){
    var resp = new twilio.TwimlResponse();
    resp.reject;
  }
  else {
      res.status(403).send('you are not twilio. Buzz off.');
  }
});

router.post("/messaging/incoming", function(req, res){
  console.log("got a message", req.body);
  
  // if (twilio.validateExpressRequest(req, config.authToken)){
  //   console.log("got a message", req);
  // }
  // else {
  //     res.status(403).send('you are not twilio. Buzz off.');
  // }
});

router.get("/test", middleware.isLoggedIn ,function(req, res){
  twilioClient.sendSms("+15415433572", "hello world");
  twilioClient.makeCall("+15415433572");
  res.render("twilio/test");
});

module.exports = router;
