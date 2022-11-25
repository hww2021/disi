<template>
  <div class="container">
    <role-panel />
    <role-list />
  </div>
</template>

<script>
import RolePanel from "@/views/settings/roles/RolePanel.vue";
import RoleList from "@/views/settings/roles/RoleList.vue";
export default {
  name: "",
  components: { RolePanel, RoleList },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
