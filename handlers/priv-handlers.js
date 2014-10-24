module.exports = {

    editPost: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .find({
            firstName: req.params.name
        })
        .toArray(function (err2, dbPosts) {     
            res.view("singleedit.jade", {
                title: "Posts",
                post: dbPosts[0]
            })
        });
    },
    publish: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .insert({
            firstName: req.payload.fname,
            lastName: req.payload.lname
        }, function(err, item) {res.redirect("/")});
    },
    deletePost: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts").remove({
            firstName: req.params.name
        }, function(err, item) {
            res.redirect("/");
        })
    },
    logout: function (req, res) {
        req.auth.session.clear();
        res.redirect("/");
    },
    updatePost: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .update({firstName: req.params.name}, {
            firstName: req.payload.fname,
            lastName: req.payload.lname
        }, function(err, count, status){res.redirect("/")});
    }
};