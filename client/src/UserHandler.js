import axios from 'axios';

const url = 'http://localhost:5000/api/user/';

class UserHandler {
	// Register User
	static async registerUser(username, email, password) {
		try {
			const response = await axios.post(url + 'register', {
				email,
				password,
			});
			
			return response;

		} catch (error) {
			return error.response;
		}
	}

	static async loginUser(email, password) {
		try {
			const response = await axios.post(url + 'login', {
				email,
				password,
			});
			
			return response;

		} catch (error) {
			return error.response;
		}
	}
}

export default UserHandler;
