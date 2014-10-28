var commentHandler = require('./commentsHandlers.js');


module.exports = [
	{
		path: "/",
		method: "GET",
		config: {
	   		handler: commentHandler.cacheComments,
		    cache: {
		    	 expiresIn: 8000000000
		    }
		}
	},
	{
		path: "/",
		method: "POST",
	   	handler: commentHandler.postComments
	}
];