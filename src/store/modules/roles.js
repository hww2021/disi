import * as api from "@/api/roles.js";

const state = () => ({
  params: {
    currentPage: 1,
    pageSize: 10,
    q: "",
    id: "",
  },
  roleData: [],
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
  setRoleData(state, roleData) {
    state.roleData = roleData;
  },
  setTotal(state, total) {
    state.total = total;
  },
};

const actions = {
  async getRoleData({ state, commit }) {
    try {
      const { currentPage, pageSize, q, id } = state.params;
      const params = {
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
        q: q,
        id: id,
      };
      const { roleData, count } = await api.getData(params);
      commit("setRoleData", roleData);
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
