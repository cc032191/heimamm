<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formque" class="demo-form-inline" ref="formque">
        <el-row>
          <el-col>
            <el-form-item label="学科" prop="subject">
              <el-select v-model="formque.subject" placeholder="请选择学科">
                <el-option
                  v-for="(item, index) in subjectlist"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="阶段" prop="step">
              <el-select v-model="formque.step" placeholder="请选择阶段">
                <el-option label="初级" value="1"></el-option>
                <el-option label="中级" value="2"></el-option>
                <el-option label="高级" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业" prop="enterprise">
              <el-select v-model="formque.enterprise" placeholder="请选择企业">
                <el-option
                  v-for="(item, index) in entlist"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题型" prop="type">
              <el-select v-model="formque.type" placeholder="请选择题型">
                <el-option label="单选" value="1"></el-option>
                <el-option label="多选" value="2"></el-option>
                <el-option label="简答" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="formque.difficulty" placeholder="请选择难度">
                <el-option label="简单" value="1"></el-option>
                <el-option label="一般" value="2"></el-option>
                <el-option label="困难" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者" prop="username">
              <el-input v-model="formque.username" style="width: 217px;"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="formque.status" placeholder="请选择状态">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期" prop="create_date">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formque.create_date"
                style="width: 217px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formque.title" style="width:507px;"></el-input>
        </el-form-item>
        <el-button type="primary" @click="getquelist()">搜索</el-button>
        <el-button @click="clear">清除</el-button>
        <el-button type="primary" @click="addque">
          <i class="el-icon-plus"></i>&nbsp;新增用户
        </el-button>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="twocard">
      <el-table :data="quelist" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="题目" width="400">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科·阶段">
          <template slot-scope="scope">
            <span v-if="scope.row.step===1">{{scope.row.subject_name}}·初级</span>
            <span v-if="scope.row.step===2">{{scope.row.subject_name}}·中级</span>
            <span v-if="scope.row.step===3">{{scope.row.subject_name}}·高级</span>
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type===1">单选</span>
            <span v-if="scope.row.type===2">多选</span>
            <span v-if="scope.row.type===3">简答</span>
          </template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="状态">
          <!-- 自定义 -->
          <template slot-scope="scope">
            <span v-if="scope.row.status">{{ scope.row.status? '启用' : '禁用' }}</span>
            <span class="spandisable" v-else>{{ scope.row.status? '启用' : '禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="compileque(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="changestate(scope.row)"
            >{{ scope.row.status? '禁用' : '启用' }}</el-button>
            <el-button type="text" size="small" @click="removeque(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pages"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { apigetque, apialterque, removeque } from "../../api/question";
import { getsubjectlist } from "../../api/subject";
import { apigetent } from "../../api/enterprise";
export default {
  data() {
    return {
      formque: {
        title: "",
        subject: "",
        step: "",
        enterprise: "",
        type: "",
        difficulty: "",
        username: "",
        status: "",
        create_date: ""
      },
      // 当前页码
      page: 1,
      pages: [1, 2, 5, 10],
      // 容量,
      limit: 10,
      // 总条数
      total: null,
      subjectlist: [],
      entlist: [],
      // 题目列表
      quelist: []
    };
  },
  created() {
    this.getquelist();
    this.getsubject();
    this.getent();
  },
  methods: {
    // 每页多少条
    handleSizeChange(newpagesize) {
      // window.console.log(newpagesize);
      this.limit = newpagesize;
      this.getquelist();
    },
    // 当前显示页码
    handleCurrentChange(newpagenum) {
      this.page = newpagenum;
      this.getquelist();
    },
    // 题目列表
    getquelist() {
      apigetque({
        title: this.formque.title,
        subject: this.formque.subject,
        enterprise: this.formque.enterprise,
        type: this.formque.type,
        step: this.formque.step,
        username: this.formque.username,
        status: this.formque.status,
        difficulty: this.formque.difficulty,
        create_date: this.formque.create_date,
        page: this.page,
        limit: this.limit
      }).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.quelist = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // 学科列表
    getsubject() {
      getsubjectlist({}).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.subjectlist = res.data.data.items;
        }
      });
    },
    // 企业列表
    getent() {
      apigetent({}).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.entlist = res.data.data.items;
        }
      });
    },
    // 清除
    clear() {
      this.$refs.formque.resetFields();
    },
    // 新增
    addque() {},
    // 编辑
    compileque() {},
    // 改变状态
    changestate(row) {
      apialterque({ id: row.id }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          if (row.status === 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
          this.getquelist();
        }
      });
    },
    // 删除
    removeque(id) {
      this.$confirm("你确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeque({ id }).then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              // 处理最后一页页码显示问题
              if (this.enterpriselist.length === 1) {
                this.pagenum -= 1;
              }
              this.getquelist();
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
    }
  }
};
</script>

<style lang='less'>
.el-form-item {
  .el-form-item__label {
    padding: 0 20px 0 15px;
  }
}
</style>