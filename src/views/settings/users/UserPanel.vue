<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="4"
        ><el-autocomplete
          v-model="name"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入姓名或账号"
          @select="handleSelect"
          :trigger-on-focus="false"
          clearable
          @clear="handleClear('id')"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <template slot-scope="{ item }">
            <div class="suggestion-list">
              <div class="item">
                <el-image :src="avatar"></el-image>
                <div class="name">{{ item.value }}</div>
              </div>
              <div class="item">
                <div class="username">{{ item.username }}</div>
              </div>
            </div>
          </template>
        </el-autocomplete></el-col
      >
      <el-col :span="3">
        <el-select
          v-model="params.site"
          filterable
          placeholder="请选择所属站点"
          clearable
          @clear="handleClear('site')"
        >
          <el-option
            v-for="item in newSiteData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="params.role"
          filterable
          placeholder="请选择角色"
          clearable
          @clear="handleClear('role')"
        >
          <el-option
            v-for="item in newRoleData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="params.status"
          filterable
          placeholder="请选择状态"
          clearable
          @clear="handleClear('status')"
        >
          <el-option
            v-for="item in statusData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <el-button @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <add-user :visible.sync="isShow" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/users.js";
import AddUser from "@/views/settings/users/AddUser.vue";
export default {
  name: "",
  components: { AddUser },
  data() {
    return {
      name: "",
      restaurants: [],
      timeout: null,
      statusData: [
        { value: "", label: "状态：全部" },
        { value: 1, label: "启用" },
        { value: 0, label: "停用" },
      ],
      avatar: require("@/assets/name.png"),
      isShow: false,
    };
  },
  props: [],
  computed: {
    ...mapState("global", ["siteData", "roleData"]),
    ...mapState("users", ["params"]),
    newSiteData() {
      const newSiteData =
        this.siteData.children && this.siteData.children.length
          ? this.siteData.children.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          : [];
      newSiteData.unshift({ value: "", label: "所属站点：全部" });
      return newSiteData;
    },
    site() {
      return this.params.site;
    },
    newRoleData() {
      const newRoleData = this.roleData.length
        ? this.roleData.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        : [];
      newRoleData.unshift({ value: "", label: "角色：全部" });
      return newRoleData;
    },
    role() {
      return this.params.role;
    },
    status() {
      return this.params.status;
    },
  },
  watch: {
    site(v) {
      this.setParams({ site: v, currentPage: 1 });
      this.getUserData();
    },
    role(v) {
      this.setParams({ role: v, currentPage: 1 });
      this.getUserData();
    },
    status(v) {
      this.setParams({ status: v, currentPage: 1 });
      this.getUserData();
    },
  },
  created() {},
  methods: {
    ...mapMutations("users", ["setParams"]),
    ...mapActions("users", ["getUserData"]),
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
        const { userData } = await api.getData({ q: queryString });
        const newUserData = userData.length
          ? userData.map((item) => ({
              id: item.id,
              value: item.name,
              username: item.username,
            }))
          : [{ id: "-1", value: "暂无数据", username: "" }];
        cb(newUserData);
      }, 3000 * Math.random());
    },
    handleSelect(item) {
      console.log(item);
      if (item.id === "-1") {
        this.name = "";
        return;
      }
      this.setParams({ id: item.id, currentPage: 1 });
      this.getUserData();
    },
    handleClear(item) {
      this.setParams({ [item]: "", currentPage: 1 });
      this.getUserData();
    },
    handleAdd() {
      this.isShow = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-autocomplete {
  width: 100%;
}
.suggestion-list {
  .item {
    display: flex;
    align-items: center;
    /deep/ .el-image {
      img {
        vertical-align: middle;
      }
    }
    .name {
      margin-left: 16px;
    }
    .username {
      margin-left: 34px;
    }
  }
}
</style>
