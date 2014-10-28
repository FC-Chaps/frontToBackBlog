//For servers
var hapi = require('hapi');
//For validation
var joi = require('joi');
var server = hapi.createServer('localhost', 8080);
var routes = require('./routes/routes.js');
var cookieOptions = require('./config/cookie.js');

//For Logging
var Good = require('good');

var loggingOptions = {
    opsInterval: 2000,
    reporters: [{
        reporter: Good.GoodConsole
    }, {
        reporter: Good.GoodFile,
        args: ['./test/awesome_log', {
            events: {
                request: '*',
                error: '*'
            }
        }]
    }, {
        reporter: require('good-http'),
        args: ['http://localhost:3000', {
            events: {
                error: '*'
            },
            threshold: 20,
        }]
    }]
};

server.pack.register({
    plugin: require('good'),
    options: loggingOptions
}, function (err) {
   if (err) {
      console.log(err);
      return;
   }
});


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

server.pack.register([
	{plugin: require("hapi-auth-cookie")},
	{plugin: require("bell")}], function(err){
		
	server.auth.strategy("session", "cookie", cookieOptions);

	server.auth.strategy("facebook", "bell", {
        provider: 'facebook',
        password: 'hapiauth',
        clientId: '380752878758574', // fill in your FB ClientId here
        clientSecret: 'b3b102b75e05934f63078f0bba72d3ac', // fill in your FB Client Secret here
        isSecure: false // Terrible idea but required if not using HTTPS
    });
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