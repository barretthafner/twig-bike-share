var middlewareObj = {};

// Auth middleware -------------------------------------------------------------------

middlewareObj.isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        res.redirect("/");
    } else {
        return next();
    }
};

// Twilio middleware -------------------------------------------------------------------

var twilioClient = require('../modules/twilio/twilioClient');
var admins = require('../modules/twilio/twilioAdmins.json');

function formatMessage(errorToReport) {
  return '[This is a test] ALERT! It appears the server is' +
    'having issues. Exception: ' + errorToReport +
    '. Go to: http://newrelic.com ' +
    'for more details.';
};

middlewareObj.twilioNotifyOnError = function(appError, request, response, next) {
  admins.forEach(function(admin) {
    var messageToSend = formatMessage(appError.message);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  next(appError);
};

// Export -------------------------------------------------------------------

module.exports = middlewareObj;
