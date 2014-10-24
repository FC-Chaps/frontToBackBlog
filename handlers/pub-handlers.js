var bcrypt = require("bcrypt");

module.exports = {
    home: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .find()
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
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("posts")
        .find({
            firstName: req.params.name
        })
        .toArray(function (err2, dbPosts) {     
            res.view("viewsingle.jade", {
                title: "Posts",
                post: dbPosts[0]
            })
        });
    },
    newPost: function (req, res) {
        res.view('single.jade', {
            title: 'Create'
        });
    },
    getLogin: function (req, res) {
        //create a login jade!
        res.view("login.jade")
    },
    login: function (req, res) {
        var db = req.server.plugins["hapi-mongodb"].db;
        db.collection("users")
        .find({username: req.payload.username})
        .toArray(function(err, match){
            if(err){
                //Change to correct error
                console.log(err)
                return res.view("404.swig");
            }
            var user = match[0];
            if(user){
                bcrypt.compare(req.payload.password, user.password, function(err, same){
                    if(same){req.auth.session.set({"username": user.username}); 
                        return res.redirect("/home");
                    } else {
                        return res.view("404.swig");
                    }
                });
            }else {
                // Change to correct error
                return res.view("404.swig");
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
                        password: hash
                    }
                    db.collection("users")
                    .insert(newUser, function(err, item){
                        req.auth.session.set({"username": newUser.username});
                        res.redirect("/");
                    });
                })
            })
        }    
    },
    folderServe: {
        directory: {
            path: 'public',
            listing: true
        }
    }
};

