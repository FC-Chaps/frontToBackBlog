var commentHandler = require('./commentsHandlers.js');


module.exports = [
	{
		path: "/getComments",
		method: "GET",
		config: {
	   		handler: commentHandler.cacheComments,
		    cache: {
		    	 expiresIn: 80000000
		    }
		}
	},
	{
		path: "/postComments",
		method: "POST",
	   	handler: commentHandler.postComments
	}
];