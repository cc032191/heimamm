<template>
  <div class="login">
    <div class="login-left">
      <div class="title">
        <img src="../../assets/titlelogo.png" alt />
        <span class="title-heima">黑马面面</span>
        <span class="title-long"></span>
        <span class="title-login">用户登录</span>
      </div>
      <!-- 表单区域 -->
      <el-form ref="form" :rules="rules" :model="form" label-width="0px" class="login-form">
        <el-form-item prop="phonecode">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="form.phonecode"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="login">
          <el-row>
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.login"></el-input>
            </el-col>
            <el-col :span="6">
              <img src="../../assets/login_captcha.png" class="login-img" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox v-model="form.type">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btnform" type="primary" @click="register()">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btnform" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
    <register></register>
  </div>
</template>

<script>
import register from "./components/register";
export default {
  data() {
    return {
      form: {
        phonecode: "",
        password: "",
        login: "",
        type: []
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        login: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为 4 个字符", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请确认已阅读",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    register
  },
  methods: {
    register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success"
          });
        } else {
          this.$message.error("错了哦，这是一条错误消息");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less'>
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-around;
  .login-left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;
    box-sizing: border-box;
    .title {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
      }
      .title-heima {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 17px;
      }
      .title-long {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-left: 14px;
      }
      .title-login {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 12px;
      }
    }
    .login-form {
      margin-top: 29px;
    }
    .btnform {
      width: 100%;
    }
    .el-form-item__content {
      line-height: 25px;
    }
    .login-img {
      height: 42px;
      width: 100%;
    }
  }
  img {
    width: 633px;
    height: 435px;
  }
}
</style>