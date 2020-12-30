const mongodb = require('mongodb');

async function dbclient(collection) {

	const client = await mongodb.MongoClient.connect(
		process.env.DB_CONNECT,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);

	return client.db('taskOrganizer').collection(collection);
}

module.exports = dbclient;