// Validation
const Joi = require('joi');

// Validation functions
const registerValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email().messages({
			'string.empty': 'email is required',
			'string.email': 'invalid email',
		}),
		password: Joi.string().required().min(8).messages({
			'string.empty': 'password is required',
			'string.min': 'password must be atleast 8 characters',
		}),
	});

	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email().messages({
			'string.empty': 'email is required',
			'string.email': 'invalid email',
		}),
		password: Joi.string().required().min(8).messages({
			'string.empty': 'password is required',
		}),
	});

	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
