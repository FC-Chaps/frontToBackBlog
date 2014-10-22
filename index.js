//For servers
var hapi = require('hapi');
//For validation
var joi = require('joi');

var server = hapi.createServer('localhost', 8080);
var routes = require('./routes/routes.js');

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