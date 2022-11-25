import * as api from "@/api/login.js";
import router from "@/router";
// import { Message } from "element-ui";

const state = () => ({
  isLogin: false,
});

const getters = {
  getIsLogin(state) {
    return state.isLogin || localStorage.getItem("token");
  },
};

const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
};

const actions = {
  async handleIsLogin({ state, commit }, params) {
    try {
      const { access_token } = await api.login(params);
      localStorage.setItem("token", access_token);
      commit("setIsLogin", true);
      router.replace({ name: "HQ" });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
