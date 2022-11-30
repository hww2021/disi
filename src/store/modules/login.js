import * as api from "@/api/login.js";
import router from "@/router";
import { Message } from "element-ui";

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
      Message.success("登录成功！");
    } catch (err) {
      Message.error("用户名或密码错误，请重新输入！");
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
