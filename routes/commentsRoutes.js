var commentHandler = require('../handlers/commentsHandlers.js');


module.exports = [
	{
		path: "/",
		method: "GET",
		config: {
	   		handler: commentHandler.cacheComments,
		    cache: {
		    	 expiresIn: 80000000
		    }
		}
	},
	{
		path: "/",
		method: "POST",
	   	handler: commentHandler.postComments
	}
];