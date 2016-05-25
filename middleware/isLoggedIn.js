var middlewareObj = {};

// Auth middleware -------------------------------------------------------------------

middlewareObj.isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        res.redirect("/");
    } else {
        return next();
    }
};

// Export -------------------------------------------------------------------

module.exports = middlewareObj;