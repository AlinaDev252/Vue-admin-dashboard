<template>
	<div class="container" :class="{ 'light-background': !isDarkMode, 'dark-background': isDarkMode }">
		<div class="login">
			<img src="@/assets/logo.png" v-show="isDarkMode" />
			<img src="@/assets/logo.png" v-show="!isDarkMode" />
			<h4 :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">Request Account</h4>
			<form @submit.prevent="onSubmit">
				<input
					type="email"
					placeholder="Email"
					:class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
					v-model="email"
					required
				/>
				<button>Request Account</button>
			</form>
			<router-link to="/signin" :class="{ 'light-link': isDarkMode, 'dark-link': !isDarkMode }"
				>Already have an account? Sign in now.</router-link
			>
			<ThemeSwitch />
		</div>
	</div>
</template>

<script>
import ThemeSwitch from "@/components/ThemeSwitch";

export default {
	name: "Request",
	components: {
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

			// Slack API Logic
			let slackURL = new URL("https://slack.com/api/chat.postMessage");

			const data = {
				token: "xoxp-1898974687044-1889730969189-2016462129700-38eca8ac9c944f916e2c3c4d3be9b446",
				channel: "hq1",
				text: `${email} has requested admin access to HQ. Please go to Netlify to invite them!`,
			};
			// Attach the data to the URL
			slackURL.search = new URLSearchParams(data);

			fetch(slackURL).then(() => {
				this.$router
					.push({
						name: "signin",
						params: {
							userRequestedAccount: true,
							email: email,
						},
					})
					.catch((error) => {
						alert("Error: " + error);
					});
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
