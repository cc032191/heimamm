<template>
  <el-dialog
    title="新增学科"
    :visible.sync="centerDialogVisible"
    width="30%"
    center
    @close="closereset"
  >
    <el-form :model="addsuBject" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="addsuBject.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="addsuBject.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="addsuBject.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="addsuBject.intro"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="addsuBject.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addaffirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addsuBject } from "../../../api/subject";
export default {
  data () {
    return {
      // 弹框开关
      centerDialogVisible: false,
      // 表单数据
      addsuBject: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    addaffirm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          addsuBject(this.addsuBject).then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              this.$message.success("新增成功");
              this.$parent.getlist();
              this.centerDialogVisible = false;
            }
          });
        } else {
          this.$message.error("验证不通过");
          return false;
        }
      });
    },
    // 表格关闭重置
    closereset () {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang='less'>
.el-dialog.el-dialog--center {
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
    padding: 25px 25px 0px;
  }
}
</style>