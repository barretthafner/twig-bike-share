/**
 * isLoggedIn middleware
 * @version 1.1.0
 * @desc A middleware that uses the passport method isAuthenticated to determine if a user is logged in.
 * @param  {object}   req  An Express request object
 * @param  {object}   res  An Express response object
 * @param  {Function} next A callback
 * @return {undefined}
 */

import { routes } from '../config';

export default function(req, res, next) {
	if (!req.isAuthenticated()) {
		req.flash('error', 'Please login!');
		res.redirect(routes.admin);
	} else {
		return next();
	}
}
