import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// * means everything
import * as netlifyIdentityWidget from "netlify-identity-widget";
import GoTrue from "gotrue-js";

Vue.config.productionTip = false;

// Initialize Netlify Identity
netlifyIdentityWidget.init();

// Initialize GoTrue jJS for Netlify
export const auth = new GoTrue({
	APIUrl: "https://alinas-vue-dashboard.netlify.app/.netlify/identity",
	setCookie: true,
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
 