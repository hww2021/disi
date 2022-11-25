<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6"
        ><el-autocomplete
          v-model="name"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete
      ></el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return {
      name: "",
      restaurants: [],
      timeout: null,
    };
  },
  props: [],
  computed: {},
  watch: {},
  created() {},
  methods: {
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
