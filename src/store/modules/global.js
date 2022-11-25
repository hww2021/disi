import * as api from "@/api/global.js";

const state = () => ({
  roleData: [],
  siteData: {},
});

const getters = {};

const mutations = {
  setRoleData(state, roleData) {
    state.roleData = state.roleData;
  },
  setSiteData(state, siteData) {
    state.siteData = siteData;
  },
};

const actions = {
  async getSiteData({ state, commit }) {
    try {
      const res = await api.getSiteData();
      commit("setSiteData", res);
    } catch (err) {
      console.log(err.message);
    }
  },
  async getRoleData({ state, commit }) {
    try {
      const res = await api.getRoleData();
      commit("setRoleData", res);
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
