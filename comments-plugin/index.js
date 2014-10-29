var routes = require('./commentsRoutes.js');

exports.register = function (plugin, next){
	plugin.route(routes);
	next();
}