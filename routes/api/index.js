var express      = require("express"),
    router       = express.Router(),
    config       = require("../../config");
    middleware   = require("../../middleware"),
    twilioClient = require("../../modules/twilio/twilioClient");

var Subscriber = require('../../models/Subscriber');

//router.post("/voice/incoming", function(req, res){
//  if (twilio.validateExpressRequest(req, config.authToken)){
//    var resp = new twilio.TwimlResponse();
//    resp.reject;
//  }
//  else {
//      res.status(403).send('you are not twilio. Buzz off.');
//  }
//});

router.post("/messaging/incoming", function(req, res){

  var message = twilioClient.getData(req);

  Subscriber.findByPhoneNumber(message.from, function(subscriber){
    if(subscriber) {
      console.log(subscriber.firstName + " sent a message! It says: " + message.body)
      twilioClient.sendSms(subscriber.phoneNumber, "got your message");
    }
  });


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
