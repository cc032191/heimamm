<template>
  <el-dialog
    title="新增企业"
    :visible.sync="centerDialogVisible"
    width="30%"
    center
    @close="closereset"
  >
    <el-form :model="addenterprise" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="addenterprise.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="addenterprise.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="addenterprise.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="addenterprise.intro"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="addenterprise.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addaddenterprise">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { apiaddent } from "../../../api/enterprise";
export default {
  data() {
    return {
      // 弹框开关
      centerDialogVisible: false,
      // 表单数据
      addenterprise: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
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
    addaddenterprise() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          apiaddenterprise(this.addenterprise).then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              this.$message.success("新增成功");
              this.$parent.getenterprise();
              this.centerDialogVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("验证不通过");
          return false;
        }
      });
    },
    // 表格关闭重置
    closereset() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style>
</style>