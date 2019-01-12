<template>
  <div class="register"  @keyup.enter="submitForm('ruleForm2')">
    <el-card class="box-card" >
      <div slot="header">
        <p>用户注册</p>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        label-position="left"
        label-width="80px"
        ref="ruleForm2"
        class="demo-ruleForm"
      >
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input v-model.number="ruleForm2.account"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
        >
          <el-input
            type="password"
            v-model="ruleForm2.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPass"
          
        >
          <el-input
            type="password"
            v-model="ruleForm2.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"

            @click="submitForm('ruleForm2')"
          >注册</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "register",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (Number.isInteger(value)) {
          callback(new Error("请输入请不要输入纯数字"));
        } else {
          if (value.length < 8) {
            callback(new Error("必须满8个字符"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        account: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        account: [{ validator: checkAge, trigger: "change" }]
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
        let data = {
          userName:this.ruleForm2.account,
          pwd:this.ruleForm2.pass,
          t:new Date().getTime()
        };
        if (valid) {
          this.axios
            .post("/api/register", data)
            .then(res => {
              if (res.data.code === "ok") {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                this.$router.push({path:"qureyUser"})
              }else {
                //  this.ruleForm2={}
                 this.$message({
                  message: res.data.message,
                  type: "warning"
                });
              }
              console.log("提交", data);
            })
            .catch(err => {});
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
  display: flex;
  justify-content: center;
}
.box-card {
  width: 400px;
}
</style>

