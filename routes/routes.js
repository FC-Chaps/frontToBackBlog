var pubHandler = require('../handlers/pub-handlers.js');
var privHandler = require('../handlers/priv-handlers.js');


// Server Routes to be imported

module.exports = [
    {
        path: '/',
        method: 'GET',
        options:{
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
        path: '/post/{name}/edit',
        method: 'GET',
        config: {
            auth: "session"
        },
        handler: privHandler.editPost
    },

    {
        path: '/post/{name}/edit',
        method: 'POST',
        config: {
            auth: "session"
        },
        handler: privHandler.updatePost
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
    },
    {
        method: "GET",
        path: "/admin/home",
        config: {
            auth: "session"
        },
        handler: privHandler.getAdminHome
    },
    {
        method: "GET",
        path: "/user/{username}/admin",
        config: {
            auth: "session"
        },
        handler: privHandler.toggleAdmin
    },
    {
        method: "GET",
        path: "/user/{username}/verified",
        config: {
            auth: "session"
        },
        handler: privHandler.toggleVerified
    },
    {
        method: "GET",
        path: "/user/{username}/delete",
        config: {
            auth: "session"
        },
        handler: privHandler.deleteUser
    }
];
