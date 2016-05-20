var mongoose = require("mongoose");
var User = require("./models/User")
var Bike = require("./models/Bike");
var BikeUser = require("./models/BikeUser");

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
            console.log("added bike: " + bike.id);
          }
        });
      });
    }
  });

  // clear and load BikeUsers
  BikeUser.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed bike users!");
      bikeUserData.forEach(function(bikeUser){
        BikeUser.create(bikeUser, function(err, bikeUser){
          if (err){
            console.log(err);
          } else {
            console.log("added bike user:" + bikeUser.email);
          }
        });
      });
    }
  });
}

var userData =
  [
    {"username": "test", "password": "testy"},
    {"username": "barrett", "password": "hafner"},
    {"username": "pizza", "password": "guy"}
  ]

var bikeData =
  [
    { "id": 10, "code": "1455" },
    { "id": 11, "code": "0356" },
    { "id": 12, "code": "8897" },
    { "id": 13, "code": "3256" },
    { "id": 14, "code": "7235" },
    { "id": 15, "code": "8991" },
    { "id": 16, "code": "7657" },
    { "id": 17, "code": "4899" },
    { "id": 18, "code": "2008" },
    { "id": 19, "code": "1212" }
  ]

var bikeUserData =
  [
    { "firstName": "Barrett", "lastName": "Hafner", "email": "thehaf@mail.com", "phoneNumber": "4052051180" },
    { "firstName": "Charley", "lastName": "Murphy", "email": "charley@themurphys.com", "phoneNumber": "6024458890" },
    { "firstName": "George", "lastName": "Costanza", "email": "georgelikeshischickenspicy@mail.com", "phoneNumber": "9908804556" },
    { "firstName": "Marcell", "lastName": "Wallace", "email": "marcelman@gmail.net", "phoneNumber": "9094402756" },
    { "firstName": "Mark", "lastName": "Misky", "email": "bikesalot@oregonbikes.com", "phoneNumber": "3034158233" },
    { "firstName": "Alisha", "lastName": "Stone", "email": "alisha.stone@privatemail.com", "phoneNumber": "8479883211" },
    { "firstName": "Courtney", "lastName": "Manson", "email": "cmanson@edusite.edu", "phoneNumber": "4041443556" },
    { "firstName": "Jeremy", "lastName": "York", "email": "thenewyork@corgis.net", "phoneNumber": "4157078737" },
    { "firstName": "Melissa", "lastName": "Barnes", "email": "xxemogirlxx@yahoo.net", "phoneNumber": "7143345222" }
];

module.exports = seedDb;
