import * as api from "@/api/users.js";

const state = () => ({
  params: { currentPage: 1, pageSize: 10, q: "", id: "" },
  userData: [],
  total: 0,
});

const getters = {};

const mutations = {
  setParams(state, params) {
    state.params = {
      ...state.params,
      ...params,
    };
  },
  setTotal(state, total) {
    state.total = total;
  },
  setUserData(state, userData) {
    state.userData = userData;
  },
};

const actions = {
  async getUserData({ state, commit }) {
    try {
      const { pageSize, currentPage, q, id } = state.params;
      const params = {
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
        q: q,
        id: id,
      };
      const { userData, count } = await api.getData(params);
      commit("setUserData", userData);
      commit("setTotal", count);
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
