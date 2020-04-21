<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="600px" class="dialog-enroll">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <!-- 头像 -->
        <!-- action:上传的路径 -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
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
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
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
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="registerLogin">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入获取验证码的方法   注册的方法
import { apigetCode, register } from "@/api/register.js";
// 导入校验的方法
import {
  verifyemall,
  phonecodetest,
  passwordtest,
  graphiccodetest
} from "@/utils/mycheck.js";
export default {
  data () {
    return {
      form: {
        // 昵称
        username: "",
        // 邮箱
        email: "",
        // 手机
        phone: "",
        // 密码
        password: "",
        // 图形码
        graphiccode: "",
        // 验证码
        rcode: "",
        // 头像属性
        avatar: ""
      },
      rules: {
        // 头像
        avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: verifyemall, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
          { validator: phonecodetest, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur"
          },
          { validator: passwordtest, trigger: "blur" }
        ],
        graphiccode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" },
          { validator: graphiccodetest, trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "65px",
      dialogFormVisible: false,
      // 图形码图片地址   时间戳优先     随机数
      graphiccodeUrl:
        // 使用在线地址
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now(),
      // 定义计时器
      timer: null,
      // 定义时间
      time: 0,
      // 上传的地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      // 上传之后的图片内容
      imageUrl: null
    };
  },
  methods: {
    // 重置表单
    cancle () {
      // 得到 form 组件元素，用且调用 resetFields
      this.$refs.form.resetFields();
      // 手动清除图片
      this.imageUrl = "";
      // 关闭面板
      this.dialogFormVisible = false;
    },
    registerLogin () {
      // 验证表单
      this.$refs.form.validate(valid => {
        if (valid) {
          register({
            username: this.form.username,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            // window.console.log(res);
            if (res.data.code !== 200) {
              this.$message.warning(res.data.message);
              return;
            } else {
              this.$message.success("注册成功");
              // 关闭表单
              this.dialogFormVisible = false;
              // 清空表单
              this.$refs.form.resetFields();
              // 头像清空
              this.imageUrl = "";
            }
          });
        } else {
          this.$message.error("请正确填写信息");
          return false;
        }
      });
    },
    changeurl () {
      // 点击验证码改变图片地址
      this.graphiccodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + +new Date();
    },
    // 获取验证码
    getauthcode () {
      // 获取验证码的时候确认手机号没有错误
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // window.console.log(reg.test(this.form.phonecode));
      if (!reg.test(this.form.phone)) {
        return this.$message.warning("请输入手机号");
      }
      // 必须输入图形码才能获取验证码
      if (this.form.graphiccode.length !== 4) {
        this.$message.warning("请输入正确的图形码");
        return (this.form.graphiccode = "");
      }
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
      }, 100);

      apigetCode({
        code: this.form.graphiccode,
        phone: this.form.phone
      }).then(res => {
        // window.console.log(res);
        // 不等于200  返回验证码错误    如果正确   显示验证码   另外填到验证码框中
        if (res.data.code !== 200) {
          this.$message.error(res.data.message);
          this.form.graphiccode = "";
          this.graphiccodeUrl =
            process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + +new Date();
          return;
        } else {
          this.$message.success("你的验证码为:" + res.data.data.captcha);
          // window.console.log(res.data.data.captcha);
          this.form.rcode = "" + res.data.data.captcha;
        }
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
    },
    // 头像上传成功之后  res服务器返回的对象   file上传的文件
    handleAvatarSuccess (res, file) {
      // console.log(res); //返回的数据
      // console.log(file); //上传的图像对象
      this.imageUrl = URL.createObjectURL(file.raw);
      // 因为头像文件没有数据绑定  所有需要单独设置数据     解决校验时avatar没有属性的问题
      this.form.avatar = res.data.file_path;
      // 需要重新单独校验
      this.$refs.form.validateField("avatar");
    },
    // 头像上传之前
    beforeAvatarUpload (file) {
      // file  上传的图片对象
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif"; //判断文件类型
      const isLt2M = file.size / 1024 / 1024 < 2; //判断文件大小

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
// 头像
.avatar-uploader {
  display: flex;
  justify-content: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-upload .avatar {
  width: 178px;
  height: 178px;
  display: inline-block;
}
</style>