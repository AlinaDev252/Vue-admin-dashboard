<template>
	<div class="container" :class="{ 'light-background': !isDarkMode, 'dark-background': isDarkMode }">
		<Notification v-if="hasText" :text="text" />
		<RequestAccount />
		<div class="login">
			<img src="@/assets/logo.png" v-show="isDarkMode" />
			<img src="@/assets/logo.png" v-show="!isDarkMode" />
			<h4 :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">Sign into Design+Code HQ</h4>
			<form @submit.prevent="onSubmit">
				<input
					type="email"
					placeholder="Email"
					:class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
					v-model="email"
					required
				/>

				<input
					type="password"
					placeholder="Password"
					:class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
					v-model="password"
					required
				/>
				<button>Sign In</button>
			</form>
			<router-link to="/recover" :class="{ 'light-link': isDarkMode, 'dark-link': !isDarkMode }"
				>Forgot your password?</router-link
			>
			<ThemeSwitch />
		</div>
	</div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import Notification from "@/components/Notification";
import { auth } from "@/main";

export default {
	name: "SignIn",
	components: {
		RequestAccount,
		ThemeSwitch,
		Notification,
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
			const password = this.password;

			auth
				.login(email, password, true)
				.then((response) => {
					// Go to the home page after sign in-> replace the current route with the home route
					this.$router.replace("/");
					console.log(response);
				})
				.catch((error) => {
					alert("Error:" + error);
				});
		},
	},
	mounted() {
		const params = this.$route.params;

		if (params.userLoggedOut) {
			this.hasText = true;
			this.text = "You have logged out!";
		} else if (params.userRecoveredAccount) {
			this.hasText = true;
			this.text = `A recovery email has been sent to ${params.email}`;
		} else if (params.userRequestedAccount) {
			this.hasText = true;
			this.text = `Your request has been sent to an administrator for ${params.email}`;
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
