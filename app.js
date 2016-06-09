// Include packages -------------------------------------------------------------------
var express         = require("express"),
    config          = require("./config"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    session         = require("express-session"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local");

var app = express();

// Connect Database
mongoose.connect(config.dbUrl);

//Database seed
if (process.argv[2] === "seed") {
  var seedDb  = require("./seeds");
  seedDb();
}

// View Engine
app.set("view engine", "ejs");
// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
// Method Override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// Express Session (for passport)
app.use(session({
  secret: config.appSecret,
  resave: false,
  saveUninitialized: false
}));

// Passport
var User = require("./models/User");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass global middleware
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

// Connect routes
var rootRoutes = require("./routes/root"),
    adminRoutes = require("./routes/admin"),
    bikeRoutes = require("./routes/bikes"),
    subscriberRoutes = require("./routes/subscribers"),
    userRoutes = require("./routes/users"),
    apiRoutes = require("./routes/api");

app.use("/", rootRoutes);
app.use("/admin", adminRoutes);
app.use("/bikes", bikeRoutes);
app.use("/subscribers", subscriberRoutes);
app.use("/users", userRoutes);
app.use("/api", apiRoutes);


// Serve '/public' folder
app.use(express.static(__dirname + "/public"));

// Start app
app.listen(config.port, config.ipAddress, function () {
  console.log("Server is running at: " + config.ipAddress + ":" + config.port);
});
