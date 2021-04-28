import Vue from "vue";
import Vuex from "vuex";

// initialize Vuex in our project
Vue.use(Vuex);

// Initial State
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  window.localStorage.setItem("isDarkMode", "true");
}

const userSelectedDarkMode =
  window.localStorage.getItem("isDarkMode") === "true";

const state = {
  isDarkMode: userSelectedDarkMode,
};

// Getters
const getters = {
  isDarkMode(state) {
    return state.isDarkMode;
  },
};

// Mutations
const mutations = {
  toggleDarkMode(state) {
    if (state.isDarkMode === true) {
      state.isDarkMode = false;
      document.body.style.background = "#f0f3f5";
      // use Local Storage to save the state
      window.localStorage.setItem("isDarkMode", "false");
    } else {
      state.isDarkMode = true;
      document.body.style.background = "#212c4f";
      window.localStorage.setItem("isDarkMode", "true");
    }
  },
};

// Actions
const actions = {
  triggerDarkMode(context) {
    context.commit("toggleDarkMode");
  },
};

export default new Vuex.Store({
  // initial state for our project and it's just a group of data values
  state,
  // group of functions that can retrieve the state
  getters,
  // group of functions that can change the state
  mutations,
  // can caus trigger for mutations that can happen asynchronously
  actions,
  modules: {},
});
