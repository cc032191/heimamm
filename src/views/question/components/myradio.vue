<template>
  <div class="radio">
    <el-radio :label="label">
      <span class="span">{{label}}</span>
      <el-input :value="text" @input="v=>$emit('changetext',v)" class="input"></el-input>
      <el-upload
        class="avatar-uploader"
        :action="imgURL"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-radio>
  </div>
</template>

<script>
export default {
  props: ["label", "text", "image"],
  data () {
    return {
      imgURL: process.env.VUE_APP_URL + `/question/upload`,
      imageUrl: process.env.VUE_APP_URL + this.image
    };
  },
  methods: {
    //   上传成功之后
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 上传图片之后把地址传给父组件
      this.$emit("changeimg", res.data.url);
    },
    // 上传之前
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif"; //判断文件类型
      const isLt2M = file.size / 1024 / 1024 < 2;

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
.radio {
  margin-top: 45px;
  .el-radio {
    display: flex;
    align-items: center;
  }
  .el-radio__label {
    display: flex;
    align-items: center;
    padding: 0px;
    .span {
      margin: 0 15px 0 10px;
    }
    .input {
      width: 476px;
      margin-right: 20px;
    }
  }
}
</style>