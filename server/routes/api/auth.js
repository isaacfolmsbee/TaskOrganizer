const router = require('express').Router();
const dbHandler = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../../validation');

router.post('/register', async (req, res) => {
	const users = await dbHandler('users');

	// Get validation
	const { error } = registerValidation(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Check if the user already exists
	const emailExists = await users.findOne({ email: req.body.email });
	if (emailExists) {
		return res.status(400).send('Email already in use');
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new user
	await users.insertOne({
		email: req.body.email,
		password: hashedPassword,
		dateCreated: new Date(),
	});

	res.status(201).send('User Registered');
});

router.post('/login', async (req, res) => {
	const users = await dbHandler('users');

	// Check if valid
	const { error } = loginValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Check if the user exists
	const user = await users.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send('Email not found');
	}

	// Check if password is correct
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) {
		return res.status(400).send('Invalid password');
	}


	// Create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('authtoken', token).status(202).send(token);
});

module.exports = router;
