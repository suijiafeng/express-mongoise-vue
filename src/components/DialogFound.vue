<template>
  <div class="logFund">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >

          <el-form-item label="收支类型:">
            <el-select
              v-model="form.type"
              placeholder="收支类型"
            >
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            prop='describe'
            label="收支描述:"
          >
            <el-input
              type="describe"
              v-model="form.describe"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop='income'
            label="收入:"
          >
            <el-input
              type="income"
              v-model.number="form.income"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop='expend'
            label="支出:"
          >
            <el-input
              type="expend"
              v-model.number="form.expend"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop='cash'
            label="账户现金:"
          >
            <el-input
              type="cash"
              v-model.number="form.cash"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input
              type="textarea"
              v-model="form.remark"
            ></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button
              type="primary"
              @click='onSubmit("form")'
            >提 交</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    var checkNum = (rule, value, callback) => {
      var regExp = /^[0-9]\d*(\.\d*[0-9])?$/g;
      var isNum = regExp.test(value);
      if (!value) {
        return callback(new Error("此处不能为空"));
      }
      setTimeout(() => {
        if (!isNum) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [{ required: true, validator: checkNum, trigger: "blur" }],
        expend: [{ required: true, validator: checkNum, trigger: "blur" }],
        cash: [{ required: true, validator: checkNum, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url = "addProfileData";
          this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/profile/${url}`, this.form).then(res => {
            // 操作成功
            if (res.data.code === 0) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
              this.dialog.show = false;
              this.$emit("update");
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
            }
          });
        }
      });
    }
  }
};
</script>

