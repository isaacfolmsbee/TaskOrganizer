<template>
	<div class="container">
		<div class="register-form">
			<h1>{{ this.info }}</h1>
			<input type="email" v-model="email" id="email" placeholder="Email...">
			<input type="password" v-model="password" id="password" placeholder="Password...">
			<button @click="loginUser()">Login</button>
			<hr>
			<p>Don't have an account? - </p>
			<a href="/register">Register</a>
		</div>
	</div>
</template>

<script>
import UserHandler from '../UserHandler'


export default {
	name: "Login",
	data() {
		return {
			email: '',
			password: '',
			info: ''
		}
	},
	methods: {
		async loginUser() {
			const response = await UserHandler.loginUser(this.email, this.password);

			if (response.status == 202) {
				this.email = '';
				this.password = '';
			}

			sessionStorage.setItem('authtoken', response.data);

			if (response.status == 202) {
				window.location.href = "/";
			}
			else {
				this.info = response.data;
			}
		}
	},
	
}
</script>

<style scoped>

</style>