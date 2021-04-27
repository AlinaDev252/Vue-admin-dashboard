<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
		<a @click="onClick">Logout</a>
	</div>
</template>

<script>
export default {
	name: "Header",
	methods: {
		onClick() {
			alert("Logout!");
		},
	},
};
</script>

<style lang="scss" scoped></style>
