/**
 * checkDbEmpty middleware
 * @version 1.1.0
 * @desc An Express middleware that checks if the database is empty and routes to the setup page if so
 * @param  {object}   req  An Express request object
 * @param  {object}   res  An Express response object
 * @param  {Function} next A callback
 * @return {undefined}
 */

import Administrator from '../models/Administrator';
import { routes } from '../config';

export default function(req, res, next) {
	if (global.dbEmpty) {
		var re = new RegExp(routes.setup);
		if (req.url.match(re)) return next();
		else {
			Administrator.count({}, (err, count) => {
				if (count > 0) {
					global.dbEmpty = false;
					return next();
				}
				else return res.redirect(routes.setup);
			});
		}
	}
	else return next();
}
