<template>
	<div class="container">
		<div class="register-form">
			<h1>{{ this.info }}</h1>
			<input type="email" v-model="email" id="email" placeholder="Email...">
			<input type="password" v-model="password" id="password" placeholder="Password...">
			<input type="password" v-model="confirmpassword" id="confirmpassword" placeholder="Confirm Password...">
			<button @click="registerUser()">Register</button>
			<hr>
		</div>
		<p>Already have an account? - </p>
		<a href="/login">Login</a>
	</div>
</template>

<script>
import UserHandler from '../UserHandler'


export default {
	name: "Register",
	data() {
		return {
			email: '',
			password: '',
			confirmpassword: '',
			info: ''
		}
	},
	methods: {
		async registerUser() {
			if (this.password === this.confirmpassword) {
				const response = await UserHandler.registerUser(this.email, this.password);
				this.info = response.data;
				if (response.status == 201) {
					this.email = '';
					this.password = '';
					this.confirmpassword = '';
				}
			} else {
				this.info = "Passwords don't match";
			}
		}
	},
	
}
</script>

<style scoped>

</style>