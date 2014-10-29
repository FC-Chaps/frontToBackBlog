
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
	    	name: "benji",
            comment: "whats going on"
        },function(err, item) {res.redirect("/")}
    	);
	}
};