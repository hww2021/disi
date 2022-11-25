import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login.js";
import users from "./modules/users.js";
import roles from "./modules/roles.js";
import global from "./modules/global.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    users,
    roles,
    global,
  },
});
