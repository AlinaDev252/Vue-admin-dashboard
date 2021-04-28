<template>
	<div class="container" :class="{ 'light-background': !isDarkMode, 'dark-background': isDarkMode }">
		<RequestAccount />
		<div class="login">
			<img src="@/assets/logo.png" v-show="isDarkMode" />
			<img src="@/assets/logo.png" v-show="!isDarkMode" />
			<h4 :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">Recover Account</h4>
			<form @submit.prevent="onSubmit">
				<input
					type="email"
					placeholder="Email"
					:class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
					v-model="email"
					required
				/>
				<button>Send Email</button>
			</form>
			<router-link to="/signin" :class="{ 'light-link': isDarkMode, 'dark-link': !isDarkMode }"
				>Already have an account? Sign in now.</router-link
			>
			<ThemeSwitch />
		</div>
	</div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import { auth } from "@/main";

export default {
	name: "Recover",
	components: {
		RequestAccount,
		ThemeSwitch,
	},
	// Add null data property as starting point
	data() {
		return {
			email: null,
			password: null,
			hasText: false,
			text: "",
		};
	},
	// Option to statically perfom logic before displaying the data
	computed: {
		isDarkMode() {
			return this.$store.getters.isDarkMode;
		},
	},
	methods: {
		onSubmit() {
			const email = this.email;

			auth
				.requestPasswordRecovery(email)
				.then(() => {
					this.$router.push({
						name: "signin",
						params: {
							userRecoveredAccount: true,
							email: email,
						},
					});
				})
				.catch((error) => {
					alert("Error: " + error);
				});
		},
	},
	mounted() {
		const params = this.$route.params;

		if (params.userLoggedOut) {
			this.hasText = true;
			this.text = "You have logged out!";
		}
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;

	min-height: 100vh;
}

.login {
	width: 400px;

	img {
		width: 6em;
	}
}
</style>
