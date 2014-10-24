module.exports = {

    editPost: function (req, res) {
        res.view('single.jade', {
            title: 'Edit'
        });
    },

    publish: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .insert({
            firstName: req.payload.fname,
            lastName: req.payload.lname
        }, function(err, item) {res.redirect("/")});
    }
};