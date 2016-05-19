var mongoose = require("mongoose");
var Bike = require("./models/Bike");

var bikeData =
  [
    { "bikeId": 10, "bikeCode": "1455" },
    { "bikeId": 11, "bikeCode": "0356" },
    { "bikeId": 12, "bikeCode": "8897" },
    { "bikeId": 13, "bikeCode": "3256" },
    { "bikeId": 14, "bikeCode": "7235" },
    { "bikeId": 15, "bikeCode": "8991" },
    { "bikeId": 16, "bikeCode": "7657" },
    { "bikeId": 17, "bikeCode": "4899" },
    { "bikeId": 18, "bikeCode": "2008" },
    { "bikeId": 19, "bikeCode": "1212" }
  ]

var bikeUsers = [
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


function seedDb() {
  // Remove all bikes
  Bike.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed bikes!");
      // add a few bikes
      bikeData.forEach(function(seed){
        Bike.create(seed, function(err, bike){
          if (err){
            console.log(err);
          } else {
            console.log("added bike: " + bike.bikeId);
          }
        });
      });
    }
  });
}

module.exports = seedDb;
