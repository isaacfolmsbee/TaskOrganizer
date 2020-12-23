<template>
	<div id="app">
		<Header />
		<div class="body-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Header from './components/Header.vue'

export default {
	name: 'App',
	components: {
		Header
	}
}
</script>

<style>
* {
	margin: 0;
}

body {
	background-color: rgb(190, 190, 190);
}

.body-content {
	margin-left: 10%;
	margin-right: 10%;
	font-size: 25px;
}
</style>
