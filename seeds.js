var mongoose = require("mongoose");
var User = require("./models/User");
var Bike = require("./models/Bike");
var Subscriber = require("./models/Subscriber");
var Setting = require("./models/Setting");
var validationCode = require("./modules/validationCode");

function seedDb() {

  // clear and load Users

  User.remove({}, function(err){
    if(err) {
      console.log(err);
    } else {
      console.log("removed users!");
      userData.forEach(function(user){
        var newUser = new User({username: user.username});
        User.register(newUser, user.password, function(err, user){
          if(err){
            console.log(err);
           } else {
             console.log("added user:" + user.username);
           }
        });
      });

    }
  });


  //clear and load bikes
  Bike.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed bikes!");
      bikeData.forEach(function(bike){
        Bike.create(bike, function(err, bike){
          if (err){
            console.log(err);
          } else {
            console.log("added bike: " + bike.bikeId);
          }
        });
      });
    }
  });

  // clear and load Subscribers
  Subscriber.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed subscribers!");
      subscriberData.forEach(function(subscriber){
        Subscriber.create(subscriber, function(err, subscriber){
          if (err){
            console.log(err);
          } else {
            subscriber.validationCode = validationCode.generate();
            subscriber.save();
            console.log("added subscriber:" + subscriber.email);
            console.log("validation code:" + subscriber.validationCode);
          }
        });
      });
    }
  });

  // clear and load settings
  Setting.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed settings!");
      settingData.forEach(function(setting){
        Setting.create(setting, function(err, setting){
          if (err){
            console.log(err);
          } else {
            console.log("added setting: " + setting.key);
          }
        });
      });
    }
  });
}



var userData =
  [
    {"username": "test", "password": "testy"}
    // {"username": "barrett", "password": "hafner"},
    // {"username": "pizza", "password": "guy"}
  ]

var bikeData =
  [
    { "bikeId": 10, "code": "1455" },
    { "bikeId": 11, "code": "0356" },
    { "bikeId": 12, "code": "8897" },
    { "bikeId": 13, "code": "3256" },
    { "bikeId": 14, "code": "7235" },
    { "bikeId": 15, "code": "8991" },
    { "bikeId": 16, "code": "7657" },
    { "bikeId": 17, "code": "4899" },
    { "bikeId": 18, "code": "2008" },
    { "bikeId": 19, "code": "1212" }
  ]

var subscriberData =
  [
    { "firstName": "Barrett", "lastName": "Hafner", "email": "thehaf@mail.com", "active": "false" }
    // { "firstName": "Steve", "lastName": "Zissou", "email": "thezissou@thesea.com",  }
    // { "firstName": "Charley", "lastName": "Murphy", "email": "charley@themurphys.com", "phoneNumber": "6024458890" },
    // { "firstName": "George", "lastName": "Costanza", "email": "georgelikeshischickenspicy@mail.com", "phoneNumber": "9908804556" },
    // { "firstName": "Marcell", "lastName": "Wallace", "email": "marcelman@gmail.net", "phoneNumber": "9094402756" },
    // { "firstName": "Mark", "lastName": "Misky", "email": "bikesalot@oregonbikes.com", "phoneNumber": "3034158233" },
    // { "firstName": "Alisha", "lastName": "Stone", "email": "alisha.stone@privatemail.com", "phoneNumber": "8479883211" },
    // { "firstName": "Courtney", "lastName": "Manson", "email": "cmanson@edusite.edu", "phoneNumber": "4041443556" },
    // { "firstName": "Jeremy", "lastName": "York", "email": "thenewyork@corgis.net", "phoneNumber": "4157078737" },
    // { "firstName": "Melissa", "lastName": "Barnes", "email": "xxemogirlxx@yahoo.net", "phoneNumber": "7143345222" }
];

var settingData =
  [
    {"key": "twilioAccountSid", "value": process.env.TWILIO_ACCOUNT_SID, "clean": true},
    {"key": "twilioAuthKey", "value": process.env.TWILIO_AUTH_TOKEN, "clean": true},
    {"key": "twilioSendingNumber", "value": process.env.TWILIO_NUMBER, "clean": false}
  ];

module.exports = seedDb;
