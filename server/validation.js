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
			'string.min': 'password minimum is 8 characters',
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
		password: Joi.string().required().messages({
			'string.empty': 'password is required',
		}),
	});

	return schema.validate(data);
};

const taskValidation = (data) => {
	const schema = Joi.object({
		category: Joi.string().alphanum().max(15).required().messages({
			'any.required': 'A category is required',
			'string.alphanum': 'Category can only contain letters and numbers',
			'string.empty': 'A category is required',
			'string.max': 'Category has a 15 character limit',
		}),
		text: Joi.string().max(100).required().messages({
			'any.required': 'A description is required',
			'string.empty': 'A description is required',
			'string.max': 'Description has a 100 character limit',
		}),
		dueDate: Joi.date().required().messages({
			'any.required': 'A due date is required',
		}),
		timeToComplete: Joi.number().min(1).required().messages({
			'any.required': 'A time estimate is required',
			'number.min': 'A time estimate is required',
			'number.base': 'The time estimate must be a number',
		}),
	});

	return schema.validate(data);
};

const categoryValidation = (data) => {
	const schema = Joi.object({
		category: Joi.string().alphanum().max(15).required().messages({
			'any.required': 'A category is required',
			'string.alphanum': 'Must only contain letters and numbers',
			'string.empty': 'A category is required',
			'string.max': 'Max length 15 characters',
		}),
	});

	return schema.validate(data);
};

const themeValidation = (data) => {
	const schema = Joi.object({
		theme: Joi.bool().required().messages({
			'any.required': 'A theme is required',
		}),
	});

	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.taskValidation = taskValidation;
module.exports.categoryValidation = categoryValidation;
module.exports.themeValidation = themeValidation;
