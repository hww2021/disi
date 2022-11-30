<template>
  <div class="container">
    <el-image
      :src="logo"
      style="width: 200px; height: auto; padding: 0 4px"
    ></el-image>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#00001E"
      text-color="#BDBDBD"
      active-text-color="#fff"
      :unique-opened="true"
      router
    >
      <template v-for="item in routes">
        <el-submenu
          v-if="item.children && item.children.length"
          :key="item.path"
          :index="item.path"
        >
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
            >{{ child.meta.title }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item v-else
          ><template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template></el-menu-item
        >
      </template>
    </el-menu>
    <div class="navbar-footer">
      <el-dropdown @command="handleCommand" size="medium">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="left: 17px"
          :popper-append-to-body="false"
        >
          <el-dropdown-item command="info" style="margin-right: 112px"
            >个人信息</el-dropdown-item
          >
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/login.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "sidebar",
  components: {},
  data() {
    return { logo: require("@/assets/logo.png") };
  },
  props: [],
  computed: {
    routes() {
      return this.$router.options.routes.filter((item) => !item.meta.noLayout);
    },
  },
  watch: {},
  created() {},
  methods: {
    ...mapMutations("login", ["setIsLogin"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async handleCommand(command) {
      if (command === "logout") {
        try {
          await api.logout();
          localStorage.removeItem("token");
          this.setIsLogin(false);
          this.$router.replace({ name: "Login" });
          this.$message.success("退出登录成功！");
        } catch (err) {
          console.log(err.message);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  height: 100%;
  .el-menu {
    border: 0;
    .el-submenu:hover {
      ::v-deep .el-submenu__title {
        color: #fff !important;
        i,
        span {
          color: #fff !important;
        }
      }
    }
    .el-menu-item {
      padding-left: 46px !important;
    }
    .el-menu-item:hover {
      color: #fff !important;
    }
  }
  .navbar-footer {
    position: fixed;
    bottom: 8px;
    padding: 8px 38px;
    /deep/ .el-dropdown span {
      color: #bdbdbd !important;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
    }
    ::v-deep .el-dropdown-menu.el-popper.el-dropdown-menu--medium {
      // min-width: 120px;
      // position: absolute !important;
      // top: 35px !important;
      left: 17px !important;
    }
  }
  /deep/ .popper-select {
    left: 17px !important;
  }
}
</style>
