# Twig Bike Share
A bike sharing platform developed by the [Open Bike Initiative](http://openbikeinitiative.org/), designed to alleviate last mile issues for employers.

This project is a online platform for managing a small to medium size bike share program. It creates a webserver that allows users to signup via email, then use SMS messaging to find out codes to unlock 4 digit tumbler U-locks (such as [this](http://www.onguardlock.com/store/combo-dt-8012c)).

Additionally, it includes features for repair reporting and checkout location reporting.

This code base has been successfully deployed as part of the following community bike share programs:
* [Westside Bike Share Pilot](http://www.wta-tma.org/westside-bike-share-pilot-project/) by the Westside Transportation Alliance in Portland, OR.

## Getting Started

These instructions will outline the infrastructure you will need to successfully use this project.

### Overview

Managing a bike share is no mean feat, there is quite a lot of work involved in managing a fleet of bicycles. Repair and maintenance, load balancing, technical troubleshooting, just to name few. If you are feeling up to the task and would like to use this service. Here are the things you will need:

1. Bikes
2. 4 digit tumber locks for each bike (like [this](http://www.onguardlock.com/store/combo-dt-8012c))
3. A [Twillo](https://www.twilio.com/) account
4. A [MailGun](https://www.mailgun.com/) account
5. A [Heroku](https://www.heroku.com) account
6. A [Mlab](https://mlab.com/) account
7. A [Github](https://www.github.com) account

### Costs

Besides the fixed costs of bikes and locks, you should also consider sinage to put up around you bike share to explain how to use the system to your users.

For the technology side, you will have variable costs from using the twilio service. Each text message sent by the system has a cost based on the twilio rates as well as a recurring cost of holding a telephone number for your system. The other recurring cost is the use of a Heroku hobby level [dyno](https://www.heroku.com/dynos). At the time of this writing the cost is $7 a month.

### Setup

Once you are ready to start the setup process check out the Setup Guide(TODO...sorry).

## Development

_To Do_ - If you are interested in working with this code directly, please PM me on github.

## Built With

* [Node](https://nodejs.org/en/docs/) - The server
* [Express](https://expressjs.com/en/4x/api.html) - The Web Framework
* [Mongoose](http://mongoosejs.com/docs/guide.html) & [MongoDb](https://www.mongodb.com/) - Database storage
* [Passport](http://passportjs.org/) - User auth
* [EJS](http://www.embeddedjs.com/) - Templating Engine
* [Mailgun](https://www.npmjs.com/package/mailgun) - Mailing service
* [Twilio](https://www.twilio.com/docs/) - Messaging Service

## Authors

* **Barrett Hafner** - [PurpleBooth](https://github.com/barretthafner)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This code is designed after a similar system built by the Open Bike Initiative for their 2013 Bike Pilot.
