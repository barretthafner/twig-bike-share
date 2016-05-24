var express         = require("express"),
    config          = require("./config");

var app = express();
config.configure(app);

var rootRoutes = require("./routes/root"),
    adminRoutes = require("./routes/admin"),
    bikeRoutes = require("./routes/bikes"),
    subscriberRoutes = require("./routes/subscribers"),
    twilioRoutes = require("./routes/twilio");

app.use("/", rootRoutes);
app.use("/admin", adminRoutes);
app.use("/bikes", bikeRoutes);
app.use("/subscribers", subscriberRoutes);
app.use("/twilio", twilioRoutes);

////Database seed
//var seedDb  = require("./seeds");
//seedDb();

// serve '/public' folder
app.use(express.static(__dirname + "/public"));

app.listen(config.port, config.ipAddress, function () {
  console.log("Server is running at: " + process.env.IP + ":" + process.env.PORT);
});
