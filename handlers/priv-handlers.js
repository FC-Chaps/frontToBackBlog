module.exports = {

    editPost: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({
            id: req.state.loggedin.id
        })
        .toArray(function (err, user) {
            if(user[0] && user[0].verified){
                db.collection("posts")
                .find({
                    id: req.params.id
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
    newPost: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({
            id: req.state.loggedin.id
        })
        .toArray(function (err, user) {
            if(user[0] && user[0].verified){
                res.view('single.jade', {
                    title: 'Create'
                });
            } else {
                res.redirect("401.jade");
            }
        });
    },
    publish: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({
            id: req.state.loggedin.id
        })
        .toArray(function (err, user) {
            if(user[0] && user[0].verified){
                db.collection("posts")
                .insert({
                    firstName: req.payload.fname,
                    lastName: req.payload.lname,
                    author: user[0].username,
                    date: new Date(),
                    id: "pid" + new Date().getTime()
                }, function(err, item) {res.redirect("/")});
            } else {
                res.view("401.jade");
            }
        });
    },
    deletePost: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({
            id: req.state.loggedin.id
        })
        .toArray(function (err, user) {
            if(user[0] && user[0].verified){
                db.collection("posts")
                .remove({
                    id: req.params.id
                }, function (err2, item) {
                    db.collection("comments")
                    .remove({
                        onPost: req.params.id
                    }, function (err3, items) {
                        res.redirect("/");
                    })
                })
            } else {
                res.view("401.jade");
            }
        });
    },
    logout: function (req, res) {
        req.auth.session.clear();
        res.redirect("/");
    },
    updatePost: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({id: req.params.id})
        .toArray(function(err, user){
            db.collection("posts")
            .update({id: req.params.id}, { 
                    $set: {
                        firstName: req.payload.fname,
                        lastName: req.payload.lname
                    }
            }, function(err, count, status){res.redirect("/")});
        })
        
    },
    getAdminHome: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        //If user has session cookie
        if(req.state.loggedin){
            //find user in DB
            db.collection("users")
            .find({id:req.state.loggedin.id})
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
        .find({id: req.params.id})
        .toArray(function (err, user) {
            if(!user[0].admin){
                db.collection("users")
                .update({id: req.params.id}, {
                    $set: { admin: true }
                }, function (err2, updated) {
                    res.redirect("/admin/home");
                });
            } else {
                db.collection("users")
                .update({id: req.params.id}, {
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
        .find({id: req.params.id})
        .toArray(function (err, user) {
            if(!user[0].verified){
                db.collection("users")
                .update({id: req.params.id}, {
                    $set: { verified: true }
                }, function (err2, updated) {
                    res.redirect("/admin/home");
                });
            } else {
                db.collection("users")
                .update({id: req.params.id}, {
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
        .remove({id: req.params.id}, function(err, item) {
            res.redirect("/admin/home");
        });
    }
};