<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  props: [],
  computed: {},
  watch: {},
  created() {
    this.getRoleData();
    this.getSiteData();
  },
  methods: {
    ...mapActions("global", ["getRoleData", "getSiteData"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
