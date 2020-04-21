<template>
  <div>
    <el-dialog title="编辑用户" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form :model="from" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="from.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="from.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="from.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="from.role_id" placeholder="请选择角色">
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="from.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁止" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="from.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { edituser } from "@/api/user.js";
import { verifyemall, phonecodetest } from "../../../utils/mycheck";
export default {
  data () {
    return {
      // 弹框开关
      centerDialogVisible: false,
      // 表单数据
      from: {
        id: "",
        username: "",
        phone: "",
        email: "",
        avatar: "",
        remark: "",
        status: "",
        role_id: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: verifyemall, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: phonecodetest, trigger: "blur" }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    addUser () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          edituser(this.from).then(res => {
            // window.console.log(res);
            if (res.data.code === 201) {
              this.$message.error(res.data.message);
            } else if (res.data.code === 200) {
              this.$message.success("修改成功");
              this.centerDialogVisible = false;
              this.$parent.getuserlist();
            }
          });
        } else {
          this.$message.error("验证不通过");
        }
      });
    }
  }
};
</script>

<style lang='less'>
</style>