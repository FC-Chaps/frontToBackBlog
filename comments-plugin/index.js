var routes = require('./commentsRoutes.js');

exports.register = function (plugin, options, next){
	plugin.route(routes);
	next();
}

exports.register.attributes = {
	pkg: require("./package.json")
}