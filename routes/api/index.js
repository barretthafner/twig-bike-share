var express       = require("express"),
    router        = express.Router(),
    config        = require("../../config"),
    middleware    = require("../../middleware"),
    messageParser = require("../../modules/messageParser"),
    client        = require("../../modules/twilio/client");

var Subscriber = require('../../models/Subscriber');
var Bike       = require('../../models/Bike');

router.post("/voice/incoming", function(req, res){
  client.rejectCall(res);
  console.log('call rejected');
});

router.post("/messaging/incoming", function(req, res){

  var message = client.getData(req);

  Subscriber.findByPhoneNumber(message.from, function(subscriber){
    if(subscriber) {
      var id = messageParser.getBikeId(message.body);
      if (id) {
        Bike.findByBikeId(id, function(bike){
          if (bike) {
            client.sendSms(subscriber.phoneNumber, "The code for bike number " + bike.id + " is: " + bike.code);
          } else {
            client.sendSms(subscriber.phoneNumber, "Sorry, we couldn't find a bike with id: " + id);
          }
        });
      } else {
        client.sendSms(subscriber.phoneNumber, "Sorry, we could not understand your request. Please send bike id number only.")
      }

      console.log(subscriber.firstName + " sent a message! It says: " + message.body);
    }
  });
});

router.get("/test", middleware.isLoggedIn ,function(req, res){
  client.sendSms("+15415433572", "hello world");
  res.render("twilio/test");
});

module.exports = router;
