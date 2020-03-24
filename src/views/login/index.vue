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
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <el-row>
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.logincode"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="checkloginUrl" class="login-img" @click="changelogin" alt />
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
          <el-button class="btnform btnformone" type="primary" @click="register">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btnform" type="primary" @click="enroll">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
    <register ref="register" />
  </div>
</template>

<script>
// 导入注册组件
import register from "./components/register";
// 导入登录方法
import { loginindex } from "@/api/login.js";
// 导入校验的方法
import { phonecode, password } from "@/utils/mycheck.js";
// 导入token方法
import { setToken } from "@/utils/mytoken.js";
export default {
  data() {
    return {
      form: {
        // 手机号
        phonecode: "18511111111",
        // 密码
        password: "12345678",
        // 验证码
        logincode: "",
        // 复选框
        type: []
      },
      rules: {
        phonecode: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
          { validator: phonecode, trigger: "blur" }
          // html5新出属性,兼容不行
          // {
          //   pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
          //   message: "手机号码格式不正确",
          //   trigger: "blur"
          // }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur"
          },
          { validator: password, trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请确认已阅读",
            trigger: "change"
          }
        ]
      },
      // 使用在线地址
      checkloginUrl:
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now()
    };
  },
  components: {
    register
  },
  methods: {
    // 更改验证码图片
    changelogin() {
      this.checkloginUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    // 登录验证
    register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          loginindex({
            phone: this.form.phonecode,
            password: this.form.password,
            code: this.form.logincode
          }).then(res => {
            window.console.log(res);
            if (res.data.code === 200) {
              this.$message.success("登录成功");
              setToken(res.data.data.token); //用自己封装的方法保存token
              this.$router.push("./home");
            } else {
              this.$message.warning(res.data.message);
            }
          });
        } else {
          this.$message.error("验证不通过");
          return false;
        }
      });
    },
    // 打开注册页面
    enroll() {
      this.$refs.register.dialogFormVisible = true;
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
      .el-form-item__content {
        line-height: 10px;
        .login-img {
          height: 42px;
          width: 100%;
        }
        .btnform {
          width: 100%;
        }
        .btnformone {
          margin-top: 20px;
        }
      }
    }
  }
  img {
    width: 633px;
    height: 435px;
  }
}
</style>