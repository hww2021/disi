<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in title" :to="{ path: item.path }">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  components: {},
  data() {
    return {};
  },
  props: [],
  computed: {
    title() {
      return this.$route.matched.filter((item) => !item.meta.hide);
    },
  },
  watch: {},
  created() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-breadcrumb {
  line-height: 60px;
}
</style>
