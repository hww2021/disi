import * as api from "@/api/users.js";
import { Message } from "element-ui";

const state = () => ({
  params: {
    currentPage: 1,
    pageSize: 10,
    q: "",
    id: "",
    site: "",
    role: "",
    status: "",
  },
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
      const { pageSize, currentPage, q, id, site, role, status } = state.params;
      const params = {
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
        q: q,
        id: id,
        site: site,
        group_id: role,
        is_active: status,
      };
      const { userData, count } = await api.getData(params);
      commit("setUserData", userData);
      commit("setTotal", count);
    } catch (err) {
      console.log(err.message);
    }
  },

  async handleIsActive({ state, commit }, row) {
    try {
      await api.isActive(row.id, row.status ? "deactivate" : "activate");
      Message.success(row.status ? "停用成功！" : "启用成功！");
      const newUserData = state.userData.map((item) =>
        item.id === row.id
          ? { ...item, status: row.status ? false : true }
          : { ...item }
      );
      commit("setUserData", newUserData);
    } catch (err) {
      console.log(err);
    }
  },

  async handleIsBatchActive({ state, commit }, params) {
    try {
      const { id, type } = params;
      await api.isBatchActive(id, type);
      Message.success(type === "activate" ? "启用成功！" : "停用成功！");
      const newUserData = state.userData.map((item) =>
        id.includes(item.id)
          ? { ...item, status: type === "activate" ? true : false }
          : { ...item }
      );
      commit("setUserData", newUserData);
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
