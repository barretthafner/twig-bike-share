var express       = require("express"),
    router        = express.Router(),
    middleware    = require("../../middleware"),
    messageParser = require("../../modules/messageParser"),
    client        = require("../../modules/twilio/client");

var Subscriber = require('../../models/Subscriber');
var Bike       = require('../../models/Bike');


router.post("/voice/incoming", function(req, res){
  client.rejectCall(res);
  console.log('Call Rejected!');
});

router.post("/messaging/incoming", function(req, res){

  if (client.validate(req, { url: 'https://42b1e6a7.ngrok.io/api/messaging/incoming' })) {

    var message = client.getMessageData(req);

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
    res.status(200).send();
  } else {
    res.status(403).send('Authorization Required!');
  }
});

router.get("/settings", middleware.isLoggedIn ,function(req, res){
  res.render("api/settings");
});

module.exports = router;
