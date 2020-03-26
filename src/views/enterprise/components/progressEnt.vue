<template>
  <el-dialog :title="titleIs?'新增企业':'编辑企业'" :visible.sync="centerDialogVisible" width="30%" center>
    <el-form :model="from" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="from.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="from.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="from.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="from.intro"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="from.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="getEnt()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apicompileent, apiaddent } from "../../../api/enterprise";
export default {
  data() {
    return {
      // 弹框开关
      centerDialogVisible: false,
      // 弹出框名字
      titleIs: "false", //false 编辑  true 新增
      // 表单数据
      from: {
        id: "",
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
        tag: ""
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      }
    };
  },
  methods: {
    getEnt() {
      if (this.titleIs === false) {
        // 处理编辑页面
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            apicompileenterprise(this.from).then(res => {
              if (res.data.code === 201) {
                this.$message.error(res.data.message);
              } else if (res.data.code === 200) {
                this.$message.success("修改成功");
                this.centerDialogVisible = false;
                this.$parent.getenterprise();
              }
            });
          } else {
            this.$message.error("验证不通过");
            return false;
          }
        });
      } else {
        // 处理新增页面
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            apiaddenterprise(this.from).then(res => {
              // window.console.log(res);
              if (res.data.code === 200) {
                this.$message.success("新增成功");
                this.$parent.getenterprise();
                this.centerDialogVisible = false;
                this.$refs.ruleForm.resetFields();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            this.$message.error("验证不通过");
            return false;
          }
        });
      }
    }
  }
};
</script>

<style>
</style>