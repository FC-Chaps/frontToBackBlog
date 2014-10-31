var routes = require('./commentsRoutes.js');

exports.register = function (plugin, options, next){
	plugin.route(routes);

    plugin.views({
        engines: {
              module: require('jade')
            }
        },
        path: '/views/comments.jade'
    });

	next();
}

exports.register.attributes = {
	pkg: require("./package.json")
}