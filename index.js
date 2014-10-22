//For servers
var hapi = require('hapi');
//For validation
var joi = require('joi');

var server = hapi.createServer('localhost', 8080);

server.views({
    engines: {
        jade: require('jade')
    },
    path: './views'
});


/* Routing allows the server to react differently based on
 * the HTTP path requested and method used. 
 */
server.route({
    path: "/",
    // This path literally points to the landing page
    method: "GET",
    handler: function (request, reply) {
        reply("What up bitches");
    }
});

/* postConfig is defined here and can act as both the 
 * handler configuration and the validation schema for
 * the posts route defined below. 

var postConfig = {
    
    
};

*/

// This route takes two extra tings in the URI.
    // As defined above it returns an object with the data inside
server.route({
    path: "/posts/{title}/{author}",
    method: "GET",
    config: { 
        validate: {
            params: {
                title: joi.string().min(8).max(100),
                author: joi.string().min(5).max(100)
            }
        }    
    },
    handler: function (request, reply) {
        // var posts = request.params.post.split("/");
        reply.view('hello.jade', {
            title: request.params.title,
            author: request.params.author
        });
    }
});




server.start(function () {
    console.log('server up and running at: ', server.info.uri);
});