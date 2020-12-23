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

/* Add 'if' to handle production environment */

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
