const express = require('express');
const mongodb = require('mongodb');
const dbHandler = require('../../db');
const verify = require('../../verifyToken');
const { taskValidation, categoryValidation } = require('../../validation');
const router = express.Router();

router.get('/', verify, async (req, res) => {
	const tasks = await dbHandler('tasks');

	res.send(
		await tasks.findOne({ userid: new mongodb.ObjectID(req.user._id) })
	);
});

router.post('/', verify, async (req, res) => {
	const tasks = await dbHandler('tasks');

	// Check if valid
	const { error } = taskValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	await tasks.updateOne(
		{ userid: new mongodb.ObjectID(req.user._id) },
		{
			$push: {
				[`categories.${req.body.category}`]: {
					$each: [
						{
							_id: new mongodb.ObjectID(),
							text: req.body.text,
							dueDate: req.body.dueDate,
							timeToComplete: +req.body.timeToComplete,
						},
					],
					$sort: { dueDate: 1, timeToComplete: 1 },
				},
			},
		},
		{
			upsert: true,
		}
	);

	res.status(201).send();
});

router.post('/category', verify, async (req, res) => {
	const tasks = await dbHandler('tasks');

	// Check if valid
	const { error } = categoryValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Check if the user has a task document
	const hasDocument = await tasks.findOne({
		userid: new mongodb.ObjectID(req.user._id),
	});

	await tasks.updateOne(
		{
			userid: new mongodb.ObjectID(req.user._id),
			[`categories.${req.body.category}`]: { $exists: false },
		},
		{
			$set: {
				[`categories.${req.body.category}`]: [],
			},
		},
		{
			upsert: !hasDocument
		}
	);

	res.status(201).send();
});

router.delete('/:category/:id', verify, async (req, res) => {
	const tasks = await dbHandler('tasks');

	try {
		const result = await tasks.updateOne(
			{ userid: mongodb.ObjectID(req.user._id) },
			{
				$pull: {
					[`categories.${req.params.category}`]: {
						_id: mongodb.ObjectID(req.params.id),
					},
				},
			}
		);

		if (result.modifiedCount >= 1) {
			res.status(200).send();
		} else {
			res.status(400).send();
		}
	} catch (error) {
		return res.status(400).send();
	}
});

module.exports = router;
