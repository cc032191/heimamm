<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formUser" class="demo-form-inline" ref="formUser">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formUser.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formUser.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formUser.role_id" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getuserlist()">搜索</el-button>
          <el-button @click="clean">清除</el-button>
          <el-button type="primary" @click="add">
            <i class="el-icon-plus"></i>&nbsp;新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="twocard">
      <el-table :data="userlist" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status">{{ scope.row.status? '启用' : '禁用' }}</span>
            <span class="spandisable" v-else>{{ scope.row.status? '启用' : '禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="switchover(scope.row)"
            >{{ scope.row.status? '禁用' : '启用' }}</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <adduser ref="adduser"></adduser>
    <edituser ref="edituser"></edituser>
  </div>
</template>

<script>
import { getuser, alteruser, removeuser } from "@/api/user.js";
import adduser from "./components/adduser";
import edituser from "./components/edituser";
export default {
  data () {
    return {
      formUser: {
        username: "",
        email: "",
        role_id: ""
      },
      pagenum: 1,
      pagesize: 10,
      pagesizes: [1, 2, 5, 10],
      // 用户列表
      userlist: [],
      // 总条数
      total: null
    };
  },
  components: {
    adduser,
    edituser
  },
  created () {
    this.getuserlist();
  },
  methods: {
    getuserlist () {
      getuser({
        username: this.formUser.username,
        email: this.formUser.email,
        role_id: this.formUser.role_id,
        page: this.pagenum,
        limit: this.pagesize
      }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.userlist = res.data.data.items;
          this.total = res.data.data.pagination.total;
        } else {
          this.$message.error("获取失败");
        }
      });
    },
    // 清除
    clean () {
      this.$refs.formUser.resetFields();
    },
    // 切换状态
    switchover (row) {
      alteruser({ id: row.id }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          if (row.status === 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
          this.getuserlist();
        }
      });
    },
    // 删除
    remove (id) {
      this.$confirm("你确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeuser({ id }).then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              // 处理最后一页页码显示问题
              if (this.userlist.length === 1) {
                this.pagenum -= 1;
              }
              this.getuserlist();
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新增
    add () {
      this.$refs.adduser.centerDialogVisible = true;
    },
    // 编辑
    edit (row) {
      // window.console.log(row)
      this.$refs.edituser.centerDialogVisible = true;
      if (row.id !== this.$refs.edituser.from.id) {
        this.$refs.edituser.from = JSON.parse(
          JSON.stringify(row)
        );
      }
    },
    // 每页多少条
    handleSizeChange (newpagesize) {
      // window.console.log(newpagesize);
      this.pagesize = newpagesize;
      this.getuserlist();
    },
    // 当前显示页码
    handleCurrentChange (newpagenum) {
      this.pagenum = newpagenum;
      this.getuserlist();
    }
  }
};
</script>

<style lang='less' scoped>
.twocard {
  margin-top: 18px;
}
.cell {
  text-align: center;
}
</style>