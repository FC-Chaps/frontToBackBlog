module.exports = {

    editPost: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({
            username: req.state.loggedin.username
        })
        .toArray(function (err, user) {
            if(user[0] && user[0].verified){
                db.collection("posts")
                .find({
                    firstName: req.params.name
                })
                .toArray(function (err2, dbPosts) {     
                    res.view("singleedit.jade", {
                        title: "Posts",
                        post: dbPosts[0]
                    });
                });
            } else {
                res.view("401.jade");
            }
        })

    },
    publish: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .insert({
            firstName: req.payload.fname,
            lastName: req.payload.lname,
            author: req.state.loggedin.username,
            date: new Date()
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
    },
    getAdminHome: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        //If user has session cookie
        if(req.state.loggedin){
            //find user in DB
            db.collection("users")
            .find({username:req.state.loggedin.username})
            .toArray(function(err, user){
                if(user[0]){
                //if they are not admin then error
                    console.log(user[0].admin);
                    if(!user[0].admin){
                        res.view("404.jade");
                    }
                    //return
                    db.collection("users")
                    .find({username: {$ne: user[0].username}}, {password:false})
                    .toArray(function (err2, dbPosts) {     
                        res.view("adminhome.jade", {
                            title: "Admin Home",
                            description: "Welcome to the Admin Home",
                            users: dbPosts
                        })  
                    });
                } else {
                    res.redirect("/login");
                }
            })
        } else {
            res.redirect("/login");
        }
    },
    toggleAdmin: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({username: req.params.username})
        .toArray(function (err, user) {
            if(!user[0].admin){
                db.collection("users")
                .update({username: req.params.username}, {
                    $set: { admin: true }
                }, function (err2, updated) {
                    res.redirect("/admin/home");
                });
            } else {
                db.collection("users")
                .update({username: req.params.username}, {
                    $set: { admin: false }
                }, function (err2, updated) {
                    res.redirect("/admin/home");
                });
            }
        })
    },
    toggleVerified: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({username: req.params.username})
        .toArray(function (err, user) {
            if(!user[0].verified){
                db.collection("users")
                .update({username: req.params.username}, {
                    $set: { verified: true }
                }, function (err2, updated) {
                    res.redirect("/admin/home");
                });
            } else {
                db.collection("users")
                .update({username: req.params.username}, {
                    $set: { verified: false }
                }, function (err2, updated) {
                    res.redirect("/admin/home");
                });
            }
        })
    },
    deleteUser: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .remove({username: req.params.username}, function(err, item) {
            res.redirect("/admin/home");
        });
    }
};