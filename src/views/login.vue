<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">火星人登月后台管理系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="60px"
      >
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="loginUser.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="loginUser.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            class="submit_btn"
          >登 录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>还没有账号？现在<router-link to='/register'>注册</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>
<script>
import jwt from "jsonwebtoken";
import md5 from "js-md5";
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
     
      this.$refs[formName].validate(valid => {
        if (valid) {
          let loginUser = {
            email: this.loginUser.email,
            password: md5(this.loginUser.password)
          };
          this.$axios
            .post("/api/login", loginUser)
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });

                setTimeout(() => {
                  this.$router.push({ path: "/home" });
                }, 1000);
                // 登录成功
                const token  = res.data.token;
                localStorage.setItem("eleToken", token);
                 sessionStorage.setItem('userInfo',JSON.stringify(res.data.data))
                // 解析token
                let secretOrPrivateKey="suiyi" // 这是加密的key（密钥） 
                const decode = jwt.verify(token,secretOrPrivateKey);
                // sessionStorage.setItem("userInfo",JSON.stringify(decode))
                console.log("解密",decode)

                // 存储数据
                this.$store.dispatch(
                  "setIsAutnenticated",
                  !this.isEmpty(decode)
                );
                this.$store.dispatch("setUser", decode);

                // 页面跳转
                // this.$router.push({ path: "/home" });
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.message
                });
              }
            })
            .catch(err => {
              console.log("111111",err)
              // this.$message({
              //   message: "服务端连接失败",
              //   type: "error"
              // });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(../assets/bg1.png) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


