<template>
  <el-dialog title="编辑企业" :visible.sync="centerDialogVisible" width="30%" center>
    <el-form :model="enterpriselist" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="enterpriselist.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="enterpriselist.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="enterpriselist.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="enterpriselist.intro"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="enterpriselist.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apicompileent } from "../../../api/enterprise";
export default {
  data() {
    return {
      // 弹框开关
      centerDialogVisible: false,
      // 父组件传过来的值
      enterpriselist: {
        eid: "", //必须传入   后端bug
        name: "",
        short_name: "",
        intro: "",
        remark: "",
        id: "",
        tag: ""
      },
      rules: {
        eid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      }
    };
  },
  methods: {
    edit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          apicompileenterprise(this.enterpriselist).then(res => {
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
    }
  }
};
</script>

<style>
</style>