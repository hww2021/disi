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
        <el-select v-model="site" filterable placeholder="请选择所属站点">
          <el-option
            v-for="item in siteData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="role" filterable placeholder="请选择角色">
          <el-option
            v-for="item in roleData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="status" filterable placeholder="请选择状态">
          <el-option
            v-for="item in statusData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/users.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      name: "",
      restaurants: [],
      timeout: null,
      siteData: [],
      site: "",
      roleData: [],
      role: "",
      statusData: [
        { value: "", label: "全部" },
        { value: 1, label: "启用" },
        { value: 0, label: "停用" },
      ],
      status: "",
      avatar: require("@/assets/name.png"),
    };
  },
  props: [],
  computed: {},
  watch: {
    name(v) {
      console.log(v);
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
