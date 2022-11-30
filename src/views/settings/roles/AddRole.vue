<template>
  <div class="container">
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="addForm.name"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          v-model="addForm.note"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('addForm')"
          class="submit-btn"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/roles.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      addForm: {
        name: "",
        note: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
      },
      id: "",
    };
  },
  props: [],
  computed: {},
  watch: {},
  async created() {
    if (this.$route.params && this.$route.params.id) {
      this.id = this.$route.params.id;
      const res = await api.getRoleInfo(this.id);
      this.addForm = {
        id: res.id,
        name: res.name,
        note: res.note,
      };
    }
  },
  methods: {
    ...mapActions("roles", ["getRoleData"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.$confirm("确认提交?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(async () => {
                const params = this.addForm;
                if (this.id) {
                  await api.update(params, this.id);
                } else {
                  await api.add(params);
                }
                this.$message({
                  type: "success",
                  message: "提交成功!",
                });
                this.$router.replace({ name: "RoleHome" });
              })
              .catch(() => {});
          } catch (err) {
            console.log(err.message);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-form {
  width: 600px !important;
}
</style>
