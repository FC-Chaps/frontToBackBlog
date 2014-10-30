module.exports = {
	cacheComments: function (req, res){
	 	var db = req.server.plugins["hapi-mongodb"].db;
	    db.collection("comments")
	    .find().toArray(function (err, data){
	    	console.log(data);
	    	
	    	res({comments: data});
	    })
	},
	postComments: function (req, res){
		console.log(req.state.loggedin.id);
		var db = req.server.plugins["hapi-mongodb"].db;
		db.collection("users")
		.find({id:req.state.loggedin.id})
		.toArray(function(err, user){
			console.log(user[0]);
			db.collection("comments")
	    	.insert({
		    	username: user[0].username,
		    	content: req.payload.comment_content,
	        }, function(err, item) {res.redirect("/")}
    		);
		})
	}
};