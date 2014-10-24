var pubHandler = require('../handlers/pub-handlers.js');
var privHandler = require('../handlers/priv-handlers.js');


// Server Routes to be imported

module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: pubHandler.home
    },

    //Serves static images, css, and javascript
    {
        method: 'GET',
        path: '/{param*}',
        handler: pubHandler.folderServe
    },

    {
        path: '/post/{name}',
        method: 'GET',
        handler: pubHandler.single
    },

    {
        path: '/new',
        method: 'GET',
        config: {
            auth: "session"
        },
        handler: pubHandler.newPost
    },

    // All Routes below require User authentication
    {
        path: '/new',
        method: 'POST',
        config: {
            auth: "session"
        },
        handler: privHandler.publish
    },

    {
        path: '/edit',
        method: 'GET',
        config: {
            auth: "session"
        },
        handler: privHandler.editPost
    },

    {
        path: '/edit',
        method: 'POST',
        config: {
            auth: "session"
        },
        handler: privHandler.publish
    },
    //AUTHENTICATION HANDLERS
    {
        method: "GET",
        path: "/login",
        handler: pubHandler.getLogin
    },
    {
        method: "GET",
        path: "/signup",
        handler: pubHandler.getSignUp
    },
    {
        method: "POST",
        path: "/signup",
        handler: pubHandler.signUp
    },
    {
        method: "GET",
        path: "/post/{name}/delete",
        config: {
            auth: "session"
        },
        handler: privHandler.deletePost
    },
/*    {
        method: "POST",
        path: "/deleteAccount",
        config: {
            auth: "session"
        },
        handler: privHandler.deleteAccount
    },*/
    {
        method: "POST",
        path: "/login",
        handler: pubHandler.login
    },
    {
        method: "GET",
        path: "/logout",
        handler: privHandler.logout
    }
];