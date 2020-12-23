// Validation
const Joi = require('joi');

// Validation functions
const registerValidation = data => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(8),
	});

	return schema.validate(data);
}

const loginValidation = data => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(8),
	});

	return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;