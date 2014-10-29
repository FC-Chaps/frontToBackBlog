//For servers
var hapi = require('hapi');
//For validation
var joi = require('joi');
<<<<<<< HEAD
var server = hapi.createServer( process.env.PORT || 8080);
=======

var pack = new hapi.Pack();
var server1 = pack.server('localhost', 8080);

>>>>>>> 043b142e1c218853deff3d9cdffd3e7d9f7ec3d3
var routes = require('./routes/routes.js');
var cookieOptions = require('./config/cookie.js');

//For Logging
var loggingOptions = require('./test/logopts.js');


pack.register({
    plugin: require('good'),
    options: loggingOptions
}, function (err) {
   if (err) {
      console.log(err);
      return;
   }
});

pack.register({
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

pack.register([
	{plugin: require("hapi-auth-cookie")},
	{plugin: require("bell")}], function(err){
		
	server1.auth.strategy("session", "cookie", cookieOptions);

	server1.auth.strategy("facebook", "bell", {

        provider: 'facebook',
        password: 'hapiauth',
        clientId: '380752878758574', // fill in your FB ClientId here
        clientSecret: 'b3b102b75e05934f63078f0bba72d3ac', // fill in your FB Client Secret here
        isSecure: false // Terrible idea but required if not using HTTPS
    });
});

server1.views({
    engines: {
        jade: require('jade')
    },
    path: './views'
});

server1.route(routes);

<<<<<<< HEAD

server.start(function () {
    console.log('server up and running at: ', server.info.uri);
});
=======
if(!module.parent){
	pack.start(function () {
	    console.log('Pack is up and running' + '\n' + 'Main Server is at ' + server1.info.uri);
    });
}

module.exports = pack;
>>>>>>> 043b142e1c218853deff3d9cdffd3e7d9f7ec3d3
