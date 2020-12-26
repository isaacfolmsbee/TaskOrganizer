const express = require('express');
const cors = require('cors');
const app = express();

// Importing routes
const auth = require('./routes/api/user');
const tasks = require('./routes/api/tasks');

// Middlewares
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use('/api/user', auth);
app.use('/api/tasks', tasks);

// Handle production
if(process.env.NODE_ENV == 'production') {

	console.log('production mode detected');

	// Static folder
	app.use(express.static(__dirname + '/public/'));

	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
