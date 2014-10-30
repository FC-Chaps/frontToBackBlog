//For servers
var hapi = require('hapi');
//For validation
var joi = require('joi');

var pack = new hapi.Pack();

// Setting cross-origin resource sharing to true allows ajax requests from different URLs
var server1 = pack.server(process.env.PORT || 8080, { cors: true });

var routes = require('./routes/routes.js');
var authOptions = require('./config/authOptions.js');

//For Logging
var loggingOptions = require('./test/logopts.js');

pack.register([require("hapi-auth-cookie"), require("bell")], function(){
	server1.auth.strategy("session", "cookie", authOptions.cookieOptions);
	server1.auth.strategy("facebook", "bell", authOptions.facebookOptions);
})

pack.register([
	{
		plugin: require('good'),
		options: loggingOptions
	},
	{plugin: require('./comments-plugin')},
	{
		plugin: require("hapi-mongodb"),
		options: {
		"url": process.env.MONGO_URI || require("./keys/mongouri.js"),
			settings: {
				db: {
					native_parser: false
				}
			}
		}
	}], function(err){
		if(err){return console.log(err)}
});

server1.views({
    engines: {
        jade: require('jade')
    },
    path: './views'
});

server1.route(routes);

if(!module.parent){
	pack.start(function () {
	    console.log('Pack is up and running' + '\n' + 'Main Server is at ' + server1.info.uri);
    });
}

module.exports = pack;