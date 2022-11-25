<template>
  <div class="container">
    <user-panel />
    <user-list />
  </div>
</template>

<script>
import UserPanel from "@/views/settings/users/UserPanel.vue";
import UserList from "@/views/settings/users/UserList.vue";
export default {
  name: "Users",
  components: { UserPanel, UserList },
  data() {
    return { userData: [] };
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
