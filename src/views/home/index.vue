<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
        <img src="../../assets/hometitle.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.userimg" alt />
        <span class="spanp">{{$store.state.username}},你好</span>
        <el-button class="btn" type="primary" @click="dropout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <el-menu
          :router="true"
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="#686A6E"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="$route.path"
        >
          <!-- 渲染 -->
          <template v-for="(item, index) in child">
            <el-menu-item
              :key="index"
              v-if="item.meta.roles.includes($store.state.role)"
              :index="item.path"
            >
              <i :class="usericon[item.meta.id]"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
          <!-- <el-menu-item index="/chart" @click="highlight('/chart')">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/user" @click="highlight('/user')">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/question" @click="highlight('/question')">
            <i class="el-icon-document-copy"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/enterprise" @click="highlight('/enterprise')">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/subject" @click="highlight('/subject')">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入获取用户信息
// import { getuserinfo } from "../../api/home.js";
import { logout } from "../../api/home.js";
// 导入删除token
import { removeToken } from "../../utils/mytoken";
// import { getToken } from "../../utils/mytoken";
// 导入子路由
import child from "../../router/childRouter.js";
export default {
  data () {
    return {
      // 当前获取到的信息
      // userinfo: [],
      // userimg: "",
      //   当前不折叠
      isCollapse: false,
      // 生成导航的数据源
      child: child,
      // 图标的对象
      usericon: {
        "1": "el-icon-s-home",
        "2": "el-icon-pie-chart",
        "3": "el-icon-user",
        "4": "el-icon-document-copy",
        "5": "el-icon-office-building",
        "6": "el-icon-notebook-2"
      }
    };
  },
  methods: {
    // 退出删除token
    dropout () {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 通知服务器退出登录
          logout().then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              // 删除token
              removeToken();
              // 跳转到首页
              this.$router.push("/login");
              this.$message({
                type: "success",
                message: "退出成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
  // 判断token写在导航守卫里面
  // created() {
  //   // 判断token非空   如果是空则提示未登录   返回login页面  不执行后面代码
  //   if (!getToken()) {
  //     this.$message.error("你没有登录,请重新登录");
  //     this.$router.push("/login");
  //     return;
  //   }
  //   // 调用getuserinfo方法获取用户信息
  //   getuserinfo().then(res => {
  //     // window.console.log(res);
  //     // 判断token真假
  //     if (res.data.code !== 200) {
  //       this.$message.error(res.data.message);
  //       this.$router.push("/login");
  //       return;
  //     } else {
  //       //保存起来
  //       this.userinfo = res.data.data;
  //       //   头像单独保存   头像需要给基地址
  //       this.userimg = process.env.VUE_APP_URL + "/" + this.userinfo.avatar;
  //     }
  //   });
  // }
};
</script>

<style lang='less'>
.el-container {
  height: 100%;
}
.el-header.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  padding: 0 20px 0 24px;
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      margin-right: 22px;
    }
    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    span {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 43px;
      height: 43px;
      border-radius: 50%;
    }
    .spanp {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      margin-left: 9px;
    }
    .el-button.btn {
      margin-left: 38px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.el-aside {
  background-color: #fff;
}
.el-main {
  background-color: #e9e9e9;
}
// 折叠样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>