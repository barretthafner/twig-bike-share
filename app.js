var express         = require("express");
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    session         = require("express-session"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");

// Connect Database
mongoose.connect(process.env.OPENBIKEDBURL || "mongodb://localhost/open-bike-project");

// Require DB Models
var User            = require("./models/User");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


//Express Session initilization for passport
app.use(session({
    secret: process.env.OPENBIKESECRET,
    resave: false,
    saveUninitialized: false
}));

// Passport configuration
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

var rootRoutes = require("./routes/root"),
    adminRoutes = require("./routes/admin"),
    bikeRoutes = require("./routes/bikes"),
    subscriberRoutes = require("./routes/subscribers");

app.use("/", rootRoutes);
app.use("/admin", adminRoutes);
app.use("/bikes", bikeRoutes);
app.use("/subscribers", subscriberRoutes);

////Database seed
//var seedDb  = require("./seeds");
//seedDb();

// serve '/public' folder
app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("Server is running at: " + process.env.IP + ":" + process.env.PORT);
});
