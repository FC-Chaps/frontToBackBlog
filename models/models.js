var joi = require("joi");

module.exports = {
	
	userSignup: joi.object().keys({
		username: joi.string().required(),
		password: joi.string().min(5).required(),
		admin: joi.boolean().required(),
		verified:
		id:
	}).with("password", "passwordConfirm"),


	facebookUser: joi.object().keys({

	})


}