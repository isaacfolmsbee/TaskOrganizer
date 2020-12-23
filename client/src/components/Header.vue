<template>
	<div class="header">
		<h1 class="title"><a class="title" href="/">Homework Organizer</a></h1>
		<div v-if="!this.authtoken">
			<a href="/register" class="login-register">register</a>
			<p class="login-register"> / </p>
			<a href="/login" class="login-register">login</a>
		</div>
		<div v-else>
			<p @click="logout()" class="login-register">logout</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Header",
	data() {
		return {
			authtoken: '',
		}
	},
	created() {
		this.authtoken = sessionStorage.getItem('authtoken');
	},
	methods: {
		logout() {
			sessionStorage.removeItem('authtoken');
			window.location.href = '/';
		}
	},
}
</script>

<style scoped>

.header {
	width: 100%;
	height: 125px;
	background-color: rgb(31, 28, 25);
	text-align: center;
}

.title {
	color: rgb(91, 199, 163);
	padding: 30px 0 0 0;
	text-decoration: none;
	font-size: 50px;
	transition: 250ms;
}

.title:hover {
	color: aquamarine;
	transition: 250ms;
}

.login-register {
	color: gray;
	font-size: 18px;
	text-decoration: none;
	display: inline;
	cursor: pointer;
}

@media only screen and (max-width: 650px) {
	.header {
		height: 80px;
	}

	.title {
		padding: 20px 0 0 0;
		font-size: 25px;
	}

	.login-register {
		font-size: 14px;
	}
}
</style>