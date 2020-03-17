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
            <img @click="changeurl" class="verifyimg" :src="graphiccodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="authcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.authcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button
              :disabled="time!==0"
              class="verifybtn"
              @click="getauthcode"
            >{{time===0?'获取用户验证码':time}}</el-button>
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
import { apigetCode } from "../../../api/register";
export default {
  data() {
    // 自定义验证邮箱
    let verifyemall = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱格式"));
      }
    };
    // 自定义验证手机号
    let phonecode = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("手机号码格式不正确"));
      }
    };
    // 自定义验证密码
    let password = (rule, value, callback) => {
      let reg = /^\w+$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("不能有特殊字符"));
      }
    };
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
        emall: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validate: verifyemall, trigger: "blur" }
        ],
        phonecode: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
          { validator: phonecode, trigger: "blur" }
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
        graphiccode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" }
        ],
        authcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "65px",
      dialogFormVisible: false,
      // 图形码图片地址   时间戳优先     随机数
      graphiccodeUrl:
        // 使用在线地址
        process.env.VUE_APP_ONLINEURL + "/captcha?type=sendsms&t=" + Date.now(),
      // 定义计时器
      timer: null,
      // 定义时间
      time: 0
    };
  },
  methods: {
    registerLogin() {
      // 验证表单
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
    },
    changeurl() {
      // 点击验证码改变图片地址
      this.graphiccodeUrl =
        process.env.VUE_APP_ONLINEURL +
        "/captcha?type=sendsms&t=" +
        +new Date();
    },
    // 获取验证码
    getauthcode() {
      // 验证码倒计时,以防止用户恶意发送验证码
      // 点完发送把倒计时设置为60s
      this.time = 60;
      // 启动计时器,如果时间大于0则1S减1,如果等于0则清除计时器
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 1000);

      apigetCode({
        code: this.form.graphiccode,
        phone: this.form.phonecode
      })
        .then(res => {
          window.console.log(res);
        })
        .catch(err => {
          window.console.log(err);
        });
      // this.$axios({
      //   url: process.env.VUE_APP_ONLINEURL + "/sendsms",
      //   method: "post",
      //   data: {
      //     code: this.form.graphiccode,
      //     phone: this.form.phonecode
      //   },
      //   跨域必须携带 cookie
      //   withCredentials: true
      // })
      //   .then(res => {
      //     window.console.log(res);
      //   })
      //   .catch(err => {
      //     window.console.log(err);
      //   });
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
      width: 143px;
      height: 41px;
    }
  }
  .dialog-footer {
    text-align: center;
    padding: 5px 20px 20px;
  }
}
</style>