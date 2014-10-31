module.exports = {
	cacheComments: function (req, res) {
	 	var url = req.headers.referer.split("/");
	 	postId = url[url.length-1];
	 	var db = req.server.plugins["hapi-mongodb"].db;
	    db.collection("comments")
	    .find({onPost: postId})
	    .toArray(function (err, data){
	    	res({comments: data});
	    })
	},
	postComments: function (req, res) {
		console.log(req.state.loggedin.id);
		var db = req.server.plugins["hapi-mongodb"].db;
		db.collection("users")
		.find({
			id:req.state.loggedin.id
		})
		.toArray(function(err, user){
			console.log(user[0]);
			db.collection("comments")
	    	.insert({
		    	username: user[0].username,
		    	content: req.payload.comment_content,
		    	onPost: req.payload.postId
	        }, function(err, item) {
	        	res.redirect("/")
	        }
    		);
		})
	}
};