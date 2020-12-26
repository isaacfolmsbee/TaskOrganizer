import axios from 'axios';

const url = 'api/tasks/';

class TaskHandler {

	// Get Tasks Organized by date than time to complete
	static getTasks(jwt) {
		return new Promise((resolve, reject) => {
			axios
				.get(
					url,
					{
						headers: {
							authtoken: jwt,
						},
					}
				)
				.then((res) => {
					const data = res.data;
					resolve(
						data.tasks.map((tasks) => ({
							...tasks,
							isDeleted: false,
						}))
					);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Create Tasks
	static insertTask(text, dueDate, timeToComplete, jwt) {
		return axios.post(
			url,
			{
				text: text,
				dueDate: dueDate,
				timeToComplete: timeToComplete,
			},
			{
				headers: {
					authtoken: jwt,
				},
			}
		);
	}

	// Delete Tasks
	static deleteTask(id, jwt) {
		return axios.delete(
			`${url}${id}`,
			{
				headers: {
					authtoken: jwt,
				},
			}
		);
	}
}

export default TaskHandler;
