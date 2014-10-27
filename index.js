//For servers
var hapi = require('hapi');
//For validation
var joi = require('joi');
var server = hapi.createServer( process.env.PORT || 8080, {
	cache: {
		engine: require("catbox-mongodb"),
		options: {
			host: "linus.mongohq.com",
			port: 10089,
			username: "hapi",
			password: "tester",
			partition: "chaps-twitter"
		}
	}
});
var routes = require('./routes/routes.js');
var cookieOptions = require('./config/cookie.js');

server.pack.register({
	plugin: require("hapi-mongodb"),
	options: {
		"url": process.env.MONGO_URI || require("./keys/mongouri.js"),
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

if(!module.parent){
	server.start(function () {
	    console.log('server up and running at: ', server.info.uri);
	});
}

module.exports = server;