<template>
	<div class="container" v-if="this.authtoken">
		<div class="create-task">
			<input type="text" id="task-name" v-model="text" placeholder="Task Name...">
			<input type="text" id="task-duedate" v-model="dueDate" placeholder="Date...">
			<input type="text" id="task-completiontime" v-model="timeToComplete" placeholder="Time...">
			<button @click="createTask()">Submit Task</button>
		</div>
		<hr>
		<div class="tasks-container">
			<div class="task"
				v-for="task in tasks"
				:key="task._id"
				@contextmenu.prevent
				:class="{ deleted: task.isDeleted }"
				@click="deleteTask(task)"
				@mouseup.right="editTask(task)"
			>
				<p class="text">{{ task.text + ' | ' + task.dueDate + ' | ' + task.timeToComplete }}</p>
			</div>
		</div>
	</div>
	<div v-else>
		<h1 class="notice">Please login to use website</h1>
	</div>
</template>

<script>
import TaskHandler from '../TaskHandler'

export default {
	name: 'Tasks',
	data() {
		return {
			tasks: [],
			text: '',
			dueDate: '',
			timeToComplete: '',
			authtoken: ''
		}
	},
	async created() {
		this.authtoken = sessionStorage.getItem('authtoken');
		this.tasks = await TaskHandler.getTasks(this.authtoken);
	},
	methods: {
		async createTask() {
			await TaskHandler.insertTask(this.text, this.dueDate, this.timeToComplete, this.authtoken);
			this.tasks = await TaskHandler.getTasks(this.authtoken);
			this.text = '';
			this.dueDate = '';
			this.timeToComplete = '';
		},
		async deleteTask(task) {
			task.isDeleted = true;

			await new Promise(r => setTimeout(r, 350));

			await TaskHandler.deleteTask(task._id, this.authtoken);
			this.tasks = await TaskHandler.getTasks(this.authtoken);
		},
		async editTask(task) {
			this.text = task.text;
			this.dueDate = task.dueDate;
			this.timeToComplete = task.timeToComplete;

			await this.deleteTask(task);
		}
	},
}
</script>

<style scoped>
.notice {
	text-align: center;
}

.create-task {
	display: flex;
	justify-content: center;
	padding: 15px;
}

.create-task input, .create-task button {
	margin: 0 12px 0 0;
	font-size: 0.85em;
	width: 20%;

	padding: 2px;
	border: 2px solid black;
	border-radius: 8px;
	background-color: rgb(246, 246, 246);
}

.create-task button {
	cursor: pointer;
	transition: 200ms;
}

.create-task button:hover {
	background-color: rgba(0, 0, 0, 0.164);
	color: black;
	transition: 200ms;
}

.tasks-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.task {
	border: 2px solid;
	width: 75%;
	border-radius: 8px;
	margin: 14px 0 0 0;
	padding: 8px;
	text-align: center;
	cursor: pointer;
	transition: 200ms;
}

.task:hover {
	background-color: rgba(0, 0, 0, 0.164);
	transition: 200ms;
}

.task.deleted {
	background-color: rgba(255, 0, 0, 0.568);
	transition: 350ms;
}

@media only screen and (max-width: 850px) {
	.create-task {
		flex-direction: column;
		align-items: center;
	}

	.create-task input, .create-task button {
		margin: 12px 0 0 0;
		width: 100%;
		background-color: rgb(246, 246, 246);
	}

	.task {
		width: 95%;
	}

	.create-task button {
		width: fit-content;
		padding: 0 5%;
	}
}
</style>