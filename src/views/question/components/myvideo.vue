<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="videoURL"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
    </el-upload>
    <video v-if="videourl" :src="videourl" controls class="video"></video>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data () {
    return {
      videoURL: process.env.VUE_APP_URL + `/question/upload`,
      videourl: process.env.VUE_APP_URL + this.value
    };
  },
  methods: {
    //   上传成功之后
    handleAvatarSuccess (res, file) {
      this.videourl = URL.createObjectURL(file.raw);
      this.$emit("input", res.data.url);
    },
    // 上传之前
    beforeAvatarUpload (file) {
      const isJPG = file.type === "video/mp4" || "video/mvo"; //判断文件类型
      const isLt2M = file.size / 1024 / 1024 < 8;

      if (!isJPG) {
        this.$message.error("上传视频只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 8MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
</style>