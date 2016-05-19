var express         = require("express");
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    session         = require("express-session");


// Require DB Models
var User            = require("./models/User");


// Connect Database
mongoose.connect(process.env.OPENBIKEDBURL || "mongodb://localhost/open-bike-project");


var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//Express Session initilization for passport
app.use(session({
    secret: "This is a secret for open-bike-project...easily hackable",
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

// serve /public folder
app.use(express.static(__dirname + "/public"));

// Root ("/") route
app.get("/", function(req, res){
    res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("Server is running at: " + process.env.IP + ":" + process.env.PORT);
});
