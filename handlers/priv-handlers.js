module.exports = {

    editPost: function (request, reply) {
        reply.view('single.jade', {
            title: 'Edit'
        });
    },

    publish: function (request, reply) {
        reply.view('single.jade', {
            title: 'Edit'
        });
    }

};