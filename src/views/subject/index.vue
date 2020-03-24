<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <el-form :inline="true" :model="formSubject" class="demo-form-inline" ref="cleardata">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formSubject.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formSubject.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formSubject.username"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="status">
          <el-select v-model="formSubject.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist()">搜索</el-button>
          <el-button @click="cleardata">清除</el-button>
          <el-button type="primary" @click="addsubject">
            <i class="el-icon-plus"></i>&nbsp;新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="el-card-list">
      <el-table :data="subjectlist" style="width: 100%">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <!-- 自定义 -->
          <template slot-scope="scope">
            <span v-if="scope.row.status">{{ scope.row.status? '启用' : '禁用' }}</span>
            <span class="spandisable" v-else>{{ scope.row.status? '启用' : '禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="compilesuBject(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="changestate(scope.row.id,scope.row.status)"
            >{{ scope.row.status? '禁用' : '启用' }}</el-button>
            <el-button type="text" size="small" @click="removesubject(scope.row.id)">删除</el-button>
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
    <!-- 新增学科 -->
    <addsubject ref="addsubject"></addsubject>
    <compile ref="compile"></compile>
  </div>
</template>

<script>
import { getsubjectlist, createstatus, removesuBject } from "../../api/subject";
import addsubject from "./components/addsubject";
import compile from "./components/compile";
export default {
  data() {
    return {
      formSubject: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      subjectlist: [],
      // 条数
      total: null,
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 5,
      // 下拉框的分页数据
      pagesizes: [1, 2, 5, 10]
    };
  },
  components: {
    addsubject,
    compile
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      getsubjectlist({
        page: this.pagenum, //第几页
        limit: this.pagesize, //每页多少条
        name: this.formSubject.name,
        rid: this.formSubject.rid,
        username: this.formSubject.username,
        status: this.formSubject.status
      }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.subjectlist = res.data.data.items;
          // 保存条数
          this.total = res.data.data.pagination.total;
          // 当前页码
          // this.pagenum = res.data.data.pagination.page;
        } else {
          this.$message.error("获取失败");
        }
      });
    },
    // 改变状态
    changestate(id, status) {
      // window.console.log(id);
      createstatus({
        id,
        status
      }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.getlist();
          if (status === 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
        }
      });
    },
    // 清除搜索框
    cleardata() {
      this.$refs.cleardata.resetFields();
    },
    // 新增学科
    addsubject() {
      // 打开弹框
      this.$refs.addsubject.centerDialogVisible = true;
    },
    // 编辑学科
    compilesuBject(row) {
      this.$refs.compile.centerDialogVisible = true;
      this.$refs.compile.compilelist = JSON.parse(JSON.stringify(row));
      // window.console.log(row);
    },
    // 删除学科
    removesubject(id) {
      this.$confirm("你确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removesuBject({ id }).then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              this.getlist();
              this.$message.success("删除成功");
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
    // 每页多少条
    handleSizeChange(newpagesize) {
      window.console.log(newpagesize);
      this.pagesize = newpagesize;
      this.getlist();
    },
    // 当前显示页码
    handleCurrentChange(newpagenum) {
      this.pagenum = newpagenum;
      this.getlist();
    }
  }
};
</script>

<style lang='less'>
.el-card-list {
  margin-top: 19px;
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
.spandisable {
  color: red;
}
</style>