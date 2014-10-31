var bcrypt = require("bcrypt");

module.exports = {
    home: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .find()
        .sort({date: -1})
        .toArray(function (err2, dbPosts) {     
            res.view("home.jade", {
                title: "The Chaps Blog",
                description: "Welcome to the Chaps blog",
                posts: dbPosts,
                auth: req.state.hasOwnProperty("loggedin") 
            })  
        });
    },
    single: function (req, res) {
        console.log(req.auth);
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .find({
            id: req.params.id
        })
        .toArray(function (err2, dbPosts) {  
            if(req.auth.isAuthenticated){
                db.collection("users")
                .find({id:req.auth.credentials.id})
                .toArray(function(err, user){
                    res.view("viewsingle.jade", {
                        title: "Posts",
                        post: dbPosts[0],
                        auth: true,
                        username: user[0].username
                    });
                });
            } else {
                res.view("viewsingle.jade", {
                    title: "Posts",
                    post: dbPosts[0],
                    auth: false,
                    username: user[0].username
                });
            }
        });
    },
    getLogin: function (req, res) {
        res.view("login.jade");
    },
    login: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({username: req.payload.username})
        .toArray(function(err, match){
            if(err){
                //Change to correct error
                console.log(err)
                return res.view("404.jade");
            }
            var user = match[0];
            if(user){
                bcrypt.compare(req.payload.password, user.password, function(err, same){
                    if(same){
                        req.auth.session.set({
                            id: user.id
                        }); 
                        return res.redirect("/");
                    } else {
                        return res.view("404.jade");
                    }
                });
            }else {
                // Change to correct error
                return res.view("404.jade");
            }
        })
    },
    getSignUp: function (req, res) {
        return res.view("signup.jade");
    },
    signUp: function (req, res) {
        if(req.payload.password === req.payload.passwordConfirm){
            var db = req.server.plugins["hapi-mongodb"].db;
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.payload.password, salt, function(err2, hash){
                    var newUser = {
                        username: req.payload.username,
                        password: hash,
                        admin: false,
                        verified: false,
                        id: "uid" + new Date().getTime()
                    }
                    db.collection("users")
                    .insert(newUser, function(err, item){
                        req.auth.session.set({
                            id: newUser.id
                        });
                        res.redirect("/");
                    });
                })
            })
        }    
    },
    loginFacebook: function (req, res) {
        var username = req.auth.credentials.profile.email.split("@")[0];
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({username:username})
        .toArray(function(err, user){
            if(user.length >= 1) {
                req.auth.session.set({id: user[0].id});
                res.redirect("/");
            } else {
                db.collection("users")
                .insert({
                    username: username,
                    admin: false,
                    verified: false,
                    id: "uid" + new Date().getTime()
                }, function(err, item){
                    req.auth.session.set({id: item.id});
                    res.redirect("/");
                })
            }
        })
    },
    folderServe: {
        directory: {
            path: 'public',
            listing: false,
            index: false
        }
    },
};