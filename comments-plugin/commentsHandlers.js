module.exports = {
	cacheComments: function (req, res) {
	 	var url = req.headers.referer.split("/");
	 	console.log(url);
	 	postId = url[url.length-1];
	 	var db = req.server.plugins["hapi-mongodb"].db;
	    db.collection("comments")
	    .find({onPost: postId})
	    .toArray(function (err, data){
	    	res.view('comments.jade',{comments: data});
	    })
	},
	postComments: function (req, res) {
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
		    	onPost: req.payload.postId,
		    	date: new Date()
	        }, function(err, item) {res.redirect("/")}
    		);
		})
	}
};