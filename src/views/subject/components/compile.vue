<template>
  <el-dialog title="编辑学科" :visible.sync="centerDialogVisible" width="30%" center>
    <el-form :model="compilelist" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="compilelist.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="compilelist.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="compilelist.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="compilelist.intro"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="compilelist.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { compilesuBject } from "../../../api/subject";
export default {
  data () {
    return {
      // 弹框开关
      centerDialogVisible: false,
      // 父组件传过来的值
      compilelist: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
        id: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    edit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          compilesuBject(this.compilelist).then(res => {
            if (res.data.code === 201) {
              this.$message.error(res.data.message);
            } else if (res.data.code === 200) {
              this.$message.success("修改成功");
              this.centerDialogVisible = false;
              this.$parent.getlist();
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