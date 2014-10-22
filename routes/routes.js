var pubHandler = require('../handlers/pub-handlers.js');
var privHandler = require('../handlers/priv-handlers.js');


// Server Routes to be imported

module.exports = [

    {
        path: '/',
        method: 'GET',
        handler: pubHandler.home
    },

    {
        path: '/post',
        method: 'GET',
        handler: pubHandler.single
    },

    {
        path: '/new',
        method: 'GET',
        handler: pubHandler.newPost
    },

    // All Routes below require User authentication
    {
        path: '/new',
        method: 'POST',
        handler: privHandler.publish
    },

    {
        path: '/edit',
        method: 'GET',
        handler: privHandler.editPost
    },

    {
        path: '/edit',
        method: 'POST',
        handler: privHandler.publish
    }

];