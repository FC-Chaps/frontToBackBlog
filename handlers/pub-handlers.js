module.exports = {

    home: function (request, reply) {
        reply.view('layout.jade', {
            title: 'landing-page'
        });
    },

    single: function (request, reply) {
        reply.view('single.jade', {
            title: 'Single'
        });
    },

    newPost: function (request, reply) {
        reply.view('single.jade', {
            title: 'Create'
        });
    },

    folderServe: {
        directory: {
            path: 'public',
            listing: true
        }
    }

};

