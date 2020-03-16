<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="600px" class="dialog-enroll">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="emall">
        <el-input v-model="form.emall" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phonecode">
        <el-input v-model="form.phonecode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth" prop="graphiccode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.graphiccode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="8">
            <img class="verifyimg" src="../../../assets/login_captcha.png" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="authcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.authcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button class="verifybtn">获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="registerLogin">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 昵称
        name: "",
        // 邮箱
        emall: "",
        // 手机
        phonecode: "",
        // 密码
        password: "",
        // 图形码
        graphiccode: "",
        // 验证码
        authcode: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        emall: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phonecode: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        graphiccode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        authcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "65px",
      dialogFormVisible: false
    };
  },
  methods: {
    registerLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message: "注册成功",
            type: "success"
          });
        } else {
          this.$message.error("验证不通过");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less'>
.dialog-enroll {
  .el-dialog__header {
    text-align: center;
    padding: 15px 20px;
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
    .el-dialog__title {
      font-size: 18px;
      font-weight: 400;
      color: #fefefe;
    }
  }
  .el-dialog__body {
    padding: 30px 30px 5px;
    .el-form-item__label {
      text-align: center;
    }
    .el-form-item__content {
      line-height: 10px;
    }
    .verifyimg {
      width: 143px;
      height: 41px;
      padding-left: 15px;
    }
    .verifybtn {
      margin-left: 15px;
    }
  }
  .dialog-footer {
    text-align: center;
    padding: 5px 20px 20px;
  }
}
</style>