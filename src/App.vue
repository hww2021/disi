<template>
  <div id="app">
    <router-view v-if="$route.meta.noLayout" />
    <el-container v-else>
      <el-aside width="260px">
        <sidebar />
      </el-aside>
      <el-container>
        <el-header>
          <page-header v-if="$route.meta.showHeader" />
          <breadcrumb v-else />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from "@/views/layout/sidebar.vue";
import breadcrumb from "@/views/layout/breadcrumb.vue";
import pageHeader from "@/views/layout/pageHeader.vue";
export default {
  name: "App",
  components: { sidebar, pageHeader, breadcrumb },
  data() {
    return {};
  },
  props: [],
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-aside {
  background-color: #00001e;
  height: 100vh;
}
.el-header {
  border-bottom: 1px solid #e0e0e0;
}
</style>
