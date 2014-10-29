
module.exports = {

	cacheComments: function (req, res){
	 	var db = req.server.plugins["hapi-mongodb"].db;
	    db.collection("comments")
	    .find().toArray(function (err, data){
	    	res(data[0]);
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