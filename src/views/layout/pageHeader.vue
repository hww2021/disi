<template>
  <div class="container">
    <el-page-header @back="goBack" :content="title"> </el-page-header>
  </div>
</template>

<script>
export default {
  name: "pageHeader",
  components: {},
  data() {
    return {};
  },
  props: [],
  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
  watch: {},
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  /deep/ .el-page-header {
    line-height: 60px;
    .el-page-header__title {
      display: none;
    }
    .el-page-header__content {
      font-size: 14px;
    }
  }
}
</style>
