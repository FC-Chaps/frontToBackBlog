var pubHandler = require('../handlers/pub-handlers.js');
var privHandler = require('../handlers/priv-handlers.js');


// Server Routes to be imported

module.exports = [
    {
        path: '/',
        method: 'GET',
        config: {
            auth: {
                strategy: "session",
                mode: "try"
            },
            plugins: {'hapi-auth-cookie': {redirectTo: false}}
        },
        handler: pubHandler.home
    },
    //Serves static images, css, and javascript
    {
        method: 'GET',
        path: '/{param*}',
        handler: pubHandler.folderServe
    },
    {
        path: '/post/{id}',
        method: 'GET',
        handler: pubHandler.single
    },

    {
        path: '/new',
        method: 'GET',
        config: {
            auth: "session"
        },
        handler: privHandler.newPost
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
        path: '/post/{id}/edit',
        method: 'GET',
        config: {   
            auth: "session"
        },
        handler: privHandler.editPost
    },

    {
        path: '/post/{id}/edit',
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
        path: "/post/{id}/delete",
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
        path: "/user/{id}/admin",
        config: {
            auth: "session"
        },
        handler: privHandler.toggleAdmin
    },
    {
        method: "GET",
        path: "/user/{id}/verified",
        config: {
            auth: "session"
        },
        handler: privHandler.toggleVerified
    },
    {
        method: "GET",
        path: "/user/{id}/delete",
        config: {
            auth: "session"
        },
        handler: privHandler.deleteUser
    },
    {
        method: "GET",
        path: "/login/facebook",
        config: {
            auth: "facebook"
        },
        handler: pubHandler.loginFacebook
    },
];
