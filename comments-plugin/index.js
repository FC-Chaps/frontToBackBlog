var routes = require('./commentsRoutes.js');

exports.register = function (plugin, options, next){
	plugin.route(routes);

    plugin.views({
        engines: {
              jade: {
                    module: require('jade')
                }
            },
        path: './views'
    });

	next();
};

exports.register.attributes = {
	pkg: require("./package.json")
};