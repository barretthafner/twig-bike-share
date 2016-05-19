var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        res.redirect("/");
    } else {
        return next();
    }
};

module.exports = middlewareObj;
