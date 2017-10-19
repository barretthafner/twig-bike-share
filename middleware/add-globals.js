/**
 * addGlobals middleware
 * @version 1.1.0
 * @desc A middleware that adds req data to res.locals
 * @param  {object}   req  An Express request object
 * @param  {object}   res  An Express response object
 * @param  {Function} next A callback
 * @return {undefined}
 */

export default function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	return next();
}
