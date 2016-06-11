var express    = require("express"),
    router     = express.Router(),
    middleware = require("../middleware"),
    regEx      = require("../modules/regExParser"),
    client     = require("../modules/twilio");

var Subscriber = require('../models/Subscriber'),
    Bike       = require('../models/Bike');


router.post("/voice/incoming", function(req, res){
  client.rejectCall(res);
  console.log('Call Rejected!');
});

router.post("/messaging/incoming", function(req, res){

  if (client.validate(req)) {

    var message = client.getMessageData(req);
    var bikeId = regEx.getBikeId(message.body);
    var validationCode = regEx.getValidationCode(message.body);

    Subscriber.findByPhoneNumber(message.from, function(subscriber){
      if (subscriber && subscriber.active) {
        if (bikeId) {
          Bike.findByBikeId(bikeId, function(bike){
            if (bike) {
              client.sendSms(subscriber.phoneNumber, "The code for bike number " + bike.bikeId + " is: " + bike.code);
            } else {
              client.sendSms(subscriber.phoneNumber, "Sorry, we couldn't find a bike with ID: " + bikeId);
            }
          });
        } else {
          client.sendSms(subscriber.phoneNumber, "Sorry, we could not understand your request. Please send bike ID number only.")
        }
        console.log(subscriber.firstName + " sent a message! It says: " + message.body);
      } else if (subscriber && !subscriber.active) {
        client.sendSms(subscriber.phoneNumber, "Sorry, your number has been deactivated.");
      } else if (validationCode) {
        Subscriber.findByValidationCode(validationCode, function (subscriber) {
          if (subscriber) {
            subscriber.phoneNumber = message.from;
            subscriber.active = true;
            subscriber.validationCode = "";
            subscriber.save();
            client.sendSms(subscriber.phoneNumber, "Welcome to the Open Bike Project. Your number is now active.");
          } else {
            client.sendSms(message.from, "Sorry you are not authorized to use this application.");
          }
        });
      } else {
        client.sendSms(message.from, "Sorry you are not authorized to use this application.");
      }
    });

    res.status(200).send();
  } else {
    res.status(403).send('Authorization Required!');
  }
});

module.exports = router;
