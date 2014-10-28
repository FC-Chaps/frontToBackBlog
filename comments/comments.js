var Hapi = require('hapi');
var commentsRoutes = require('./commentsRoutes.js');

// set up 
// var serverConfig = {
// 	cache: require('catbox-memory')
// };

var server = new Hapi.Server("localhost", 8081);

server.pack.register({
	plugin: require("hapi-mongodb"),
	options: {
		"url": "mongodb://hapi:tester@linus.mongohq.com:10089/chaps-twitter",
		settings: { 
			db: {
				native_parser: false
			}
		}
	}
}, function(err){console.log(err)});

server.route(commentsRoutes);
server.start();


