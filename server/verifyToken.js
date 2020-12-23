const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

	// Get token and check if it exists
	const token = req.header('authtoken');
	if (!token) {
		return res.status(401).send('Access Denied');
	}

	// Verify token and assign it to req.user
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).send('Invalid Token');
	}
}
