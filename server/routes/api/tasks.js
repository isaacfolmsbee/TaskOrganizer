const express = require('express');
const mongodb = require('mongodb');
const dbHandler = require('../../db');
const verify = require('../../verifyToken');
const router = express.Router();

router.get('/', verify, async (req, res) => {
	const tasks = await dbHandler('tasks');

	res.send(
		await tasks.findOne({ userid: new mongodb.ObjectID(req.user._id) })
	);
});

router.post('/', verify, async (req, res) => {
	const tasks = await dbHandler('tasks');

	await tasks.updateOne(
		{ userid: new mongodb.ObjectID(req.user._id) },
		{
			$push: {
				tasks: {
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

router.delete('/:id', verify, async (req, res) => {
	const tasks = await dbHandler('tasks');

	// await tasks.deleteOne({
	// 	_id: new mongodb.ObjectID(req.params.id),
	// });
	await tasks.updateOne(
		{ userid: req.user._id },
		{ $pull: { tasks: { _id: mongodb.ObjectID(req.params.id) } } }
	);

	res.status(200).send();
});

module.exports = router;
