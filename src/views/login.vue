<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header">
        <p>用户登录</p>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-form
        :model="loginForm"
        status-icon
        label-position="left"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input v-model.trim="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
        >
          <el-input
            type="password"
            autocomplete="off"
            v-model.trim="loginForm.pwd"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login('ruleForm2')"
          >登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {}
    };
  },
  methods: {
    login() {
      let data = this.loginForm;
      this.axios
        .post("/api/login", data)
        .then(res => {
          if ((res.data.code === "ok")) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
          console.log(data);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    resetForm() {
      console.log("haha");
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
}
</style>


