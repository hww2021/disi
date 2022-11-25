<template>
  <div class="container">
    <div class="content">
      <div class="logo">
        <el-image :src="logo" style="width: auto; height: 102px"></el-image>
      </div>
      <p class="title">登录</p>
      <div class="form">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="loginForm demo-loginForm"
          label-position="top"
          @submit.native.prevent
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
              class="submit-btn"
              native-type="submit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/login.js";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      logo: require("@/assets/logo.png"),
      loginForm: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: [],
  computed: {},
  watch: {},
  created() {},
  methods: {
    ...mapActions("login", ["handleIsLogin"]),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = this.loginForm;
          this.handleIsLogin(params);
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
.container {
  width: 100vw;
  height: 100vh;
  background-color: #233556;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    background-color: #fff;
    padding: 24px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .logo {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
    .form {
      width: 370px;
    }
  }
}
</style>
