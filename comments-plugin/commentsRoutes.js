var commentHandler = require('./commentsHandlers.js');


module.exports = [
	{
		path: "/getComments",
		method: "GET",
		config: {
	   		handler: commentHandler.cacheComments
		}
	},
	{
		path: "/postComments",
		method: "POST",
		config: {
			auth: "session"
		},
	   	handler: commentHandler.postComments
	},
];