<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">火星人登月后台管理系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item
          label="用户名"
          prop="name"
        >
          <el-input
            v-model="registerUser.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="registerUser.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="registerUser.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="password2"
        >
          <el-input
            v-model="registerUser.password2"
            placeholder="请确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select
            v-model="registerUser.identity"
            placeholder="请选择身份"
          >
            <el-option
              label="管理员"
              value="manager"
            ></el-option>
            <el-option
              label="员工"
              value="employee"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('registerForm')"
          >注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import md5 from "js-md5";
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("/api/tabletree")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const  registerUser  = {
            name: this.registerUser.name,
            email: this.registerUser.email,
            password: md5(this.registerUser.password),
            identity: this.registerUser.identity,
            createDate: new Date().getTime()
          };
          // let registerUser = Object.assign(createDate, this.registerUser);
          this.$axios.post("/api/register", registerUser).then(res => {
            if (res.data.code == 0) {
              // 注册成功
              this.$message({
                message: "注册成功！",
                type: "success"
              });
              this.$router.push({ name: "qureyUser", params: { t: "1234" } });
            } else {
              this.$message({
                type: "warning",
                message: res.data.message
              });
            }
            // this.$router.push("/login");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.register {
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
  top: 10%;
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
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>

