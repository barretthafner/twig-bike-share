/**
 * redirectInsecure middleware
 * @version 1.1.0
 * @desc A middleware that redirects traffic that did not arrive on https
 * @param  {object}   req  An Express request object
 * @param  {object}   res  An Express response object
 * @param  {Function} next A callback
 * @return {undefined}
 */

export default function(req, res, next) {
  if (req.headers['x-forwarded-proto'] != 'https')
    return res.redirect(301, 'https://' + req.hostname + req.originalUrl);
  else return next();
};
