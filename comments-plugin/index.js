var routes = require('./commentsRoutes.js');

exports.register = function (plugin, options, next){
	plugin.route(routes);

    plugin.views({
        engines: {
              module: require('jade')
            },
        path: './comments-plugin/views/'
    });

	next();
};

exports.register.attributes = {
	pkg: require("./package.json")
};