//For servers
var hapi = require('hapi');
//For validation
var joi = require('joi');

var server = hapi.createServer('localhost', 8080);
var routes = require('./routes/routes.js');
var cookieOptions = require('./config/cookie.js');

server.pack.register({
	plugin: require("hapi-mongodb"),
	options: {
		"url": require("./keys/mongouri.js"),
		settings: {
			db: {
				native_parser: false
			}
		}
	}
}, function(err){console.log(err)});

server.pack.register(require("hapi-auth-cookie"), function(err){
	server.auth.strategy("session", "cookie", cookieOptions);
});

server.views({
    engines: {
        jade: require('jade')
    },
    path: './views'
});

server.route(routes);

server.start(function () {
    console.log('server up and running at: ', server.info.uri);
});