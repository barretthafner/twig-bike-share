var express             = require("express"),
    config              = require("./config"),
    messageModule = require("./modules/twilio"),
    mailerModule  = require("./modules/mailgun");

var app = express();
config.configure(app);

//Database seed
if (process.argv[2] === "seed") {
  var seedDb  = require("./seeds");
  seedDb();
}
messageModule.configure();



var rootRoutes = require("./routes/root"),
    adminRoutes = require("./routes/admin"),
    bikeRoutes = require("./routes/bikes"),
    subscriberRoutes = require("./routes/subscribers"),
    userRoutes = require("./routes/users"),
    mailerRoutes = require("./routes/mailer"),
    apiRoutes = require("./routes/api");

app.use("/", rootRoutes);
app.use("/admin", adminRoutes);
app.use("/bikes", bikeRoutes);
app.use("/subscribers", subscriberRoutes);
app.use("/users", userRoutes);
app.use("/mailer", mailerRoutes);
app.use("/api", apiRoutes);


// serve '/public' folder
app.use(express.static(__dirname + "/public"));

app.listen(config.port, config.ipAddress, function () {
  console.log("Server is running at: " + config.ipAddress + ":" + config.port);
});
