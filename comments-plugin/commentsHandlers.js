
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
		var db = req.server.plugins["hapi-mongodb"].db;
	    db.collection("comments")
	    .insert({
	    	username: req.payload.user_name,
	    	content: req.payload.comment_content,
        },function(err, item) {res.redirect("/")}
    	);
	}
};