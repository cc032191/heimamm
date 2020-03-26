<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <el-form :inline="true" :model="formenterprise" class="demo-form-inline" ref="enterprise">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="formenterprise.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="formenterprise.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formenterprise.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formenterprise.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getent">搜索</el-button>
          <el-button @click="cleardata">清除</el-button>
          <el-button type="primary" @click="addenterprise">
            <i class="el-icon-plus"></i>&nbsp;新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="el-card-list">
      <el-table :data="enterpriselist" style="width: 100%">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time|data}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <!-- 自定义 -->
          <template slot-scope="scope">
            <span v-if="scope.row.status">{{ scope.row.status? '启用' : '禁用' }}</span>
            <span class="spandisable" v-else>{{ scope.row.status? '启用' : '禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="compileenterprise(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="changestate(scope.row)"
            >{{ scope.row.status? '禁用' : '启用' }}</el-button>
            <el-button type="text" size="small" @click="removeenterprise(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagenum"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- <addenterprise ref="addenterprise"></addenterprise>
    <compileenterprise ref="compileenterprise"></compileenterprise>-->
    <!-- 整合页面 -->
    <progressEnt ref="progressEnt"></progressEnt>
  </div>
</template>

<script>
import {
  apigetenterpriselist,
  apicreatestatus,
  apiremoveenterprise
} from "../../api/enterprise";
// import addenterprise from "./components/addenterprise";
// import compileenterprise from "./components/compileenterprise";
import progressEnt from "./components/processEnt";
export default {
  data() {
    return {
      formenterprise: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      enterpriselist: [],
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
    progressEnt
    // addenterprise,
    // compileenterprise
  },
  created() {
    this.getenterprise();
  },
  methods: {
    // 新增
    addenterprise() {
      // this.$refs.addenterprise.centerDialogVisible = true;
      // 整合页面
      this.$refs.progressEnt.titleIs = true;
      this.$refs.progressEnt.centerDialogVisible = true;
      if (this.$refs.progressEnt.from.id !== "") {
        this.$refs.progressEnt.$refs.ruleForm.resetFields();
      }
    },
    // 编辑
    compileenterprise(row) {
      // window.console.log(row);
      // if (row.id !== this.$refs.compileenterprise.enterpriselist.id) {
      //   this.$refs.compileenterprise.enterpriselist = JSON.parse(
      //     JSON.stringify(row)
      //   );
      // }
      // this.$refs.compileenterprise.centerDialogVisible = true;
      // 整合页面
      this.$refs.progressEnt.titleIs = false;
      this.$refs.progressEnt.centerDialogVisible = true;
      // if (row.id !== this.$refs.progressEnt.from.id) {
      this.$refs.progressEnt.from = JSON.parse(JSON.stringify(row));
      // }
    },
    // 搜索
    getent() {
      this.pagenum = 1;
      this.getenterprise();
    },
    // 得到数据
    getenterprise() {
      apigetenterpriselist({
        name: this.formenterprise.name,
        page: this.pagenum,
        limit: this.pagesize,
        eid: this.formenterprise.eid,
        username: this.formenterprise.username,
        status: this.formenterprise.status
      }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.enterpriselist = res.data.data.items;
          this.total = res.data.data.pagination.total;
        } else {
          this.$message.error("获取失败");
        }
      });
    },
    // 清空
    cleardata() {
      this.$refs.enterprise.resetFields();
    },
    // 改变状态
    changestate(row) {
      apicreatestatus({ id: row.id }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          if (row.status === 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
          this.getenterprise();
        }
      });
    },
    // 删除
    removeenterprise(id) {
      this.$confirm("你确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiremoveenterprise({ id }).then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              // 处理最后一页页码显示问题
              if (this.enterpriselist.length === 1) {
                this.pagenum -= 1;
              }
              this.getenterprise();
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
    // 每页多少条
    sizeChange(newpagesize) {
      // window.console.log(newpagesize);
      this.pagesize = newpagesize;
      this.getenterprise();
    },
    // 当前显示页码
    currentChange(newpagenum) {
      this.pagenum = newpagenum;
      this.getenterprise();
    }
  }
};
</script>

<style>
</style>