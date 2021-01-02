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

const taskValidation = (data) => {
	const schema = Joi.object({
		category: Joi.string().required().messages({
			'any.required': 'A category is required',
			'string.empty': 'A category is required',
		}),
		text: Joi.string().required().messages({
			'any.required': 'A description is required',
			'string.empty': 'A description is required',
		}),
		dueDate: Joi.string().required().messages({
			'any.required': 'A due date is required',
			'string.empty': 'A due date is required',
		}),
		timeToComplete: Joi.number().required().messages({
			'any.required': 'A time estimate is required',
			'number.base': 'The time estimate must be a number',
		}),
	});

	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.taskValidation = taskValidation;
