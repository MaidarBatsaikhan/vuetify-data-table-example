import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// const store = reactive({
//   isloggedin: false,
//   setisloggedin(value) {
//     this.isloggedin = value;
//   },
// });

const store = new Vuex.Store({
  state: {
    is_logged_in: false,
    message: [],
  },
  mutations: {
    login(state) {
      state.is_logged_in = true;
    },
    logout(state) {
      state.is_logged_in = false;
    },
    setmessage(state, data) {
      state.message = data;
    },
  },
});

export default store;
