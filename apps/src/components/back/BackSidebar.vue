<template>
  <div id="container">
    <div id="logo">
      <img src="../../../public/images/icons/chuangye.png" alt="" srcset="" >
    </div>
    <el-menu :default-active="activePath" class="el-menu-vertical-demo" :collapse="isCollapse" @select="handleUpdate">
      <el-menu-item index="home" @click="routerPush(router, '/admin')">
        <el-icon><img src="../../../public/images/icons/dashboard.svg" alt=""></el-icon>
        <span class="tit">后台总览</span>
      </el-menu-item>
      <el-menu-item index="frontDesk" @click="routerPush(router, '/admin/competition')">
        <el-icon><img src="../../../public/images/icons/frontend.svg" alt=""></el-icon>
        <span class="tit">比赛管理</span>
      </el-menu-item>
      <el-sub-menu index="account">
        <template #title>
          <el-icon><img src="../../../public/images/icons/user.svg" alt=""></el-icon>
          <span class="tit">账户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="admin" @click="routerPush(router, '/admin/account/admin')">
            <span class="tit">管理员账户</span>
          </el-menu-item>
          <el-menu-item index="stu" @click="routerPush(router, '/admin/account/judge')">
            <span class="tit">评审老师账户</span></el-menu-item>
          <el-menu-item index="judge" @click="routerPush(router, '/admin/account/stu')">
            <span class="tit">学生账户</span></el-menu-item>
            <el-menu-item index="judge" @click="routerPush(router, '/admin/account/institute')">
            <span class="tit">机构管理</span></el-menu-item>
          <!-- <el-menu-item
        index="qiniuFile"
        @click="routerPush(router, '/admin/qiniuFile')"
        >七牛云</el-menu-item
      > -->
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="article">
        <template #title>
          <el-icon><img src="../../../public/images/icons/blog.svg" alt=""></el-icon>
          <span class="tit">门户网站管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="createBlog" @click="routerPush(router, '/admin/website/createBlog')">
            <span class="tit">发布新闻</span>
          </el-menu-item>
          <el-menu-item index="blogList" @click="routerPush(router, '/admin/blogList')">
            <span class="tit">新闻管理</span></el-menu-item>
          <el-menu-item index="folder" @click="routerPush(router, '/admin/website/folder')">
            <span class="tit">文件夹管理</span></el-menu-item>
          <el-menu-item index="tags" @click="routerPush(router, '/admin/tags')">
            <span class="tit">导航管理</span></el-menu-item>
          <el-menu-item index="draft" @click="routerPush(router, '/admin/draft')">
            <span class="tit">草稿箱</span></el-menu-item>
          <el-menu-item index="trash" @click="routerPush(router, '/admin/trash')">
            <span class="tit">垃圾箱</span></el-menu-item>
          <!-- <el-menu-item
        index="qiniuFile"
        @click="routerPush(router, '/admin/qiniuFile')"
        >七牛云</el-menu-item
      > -->
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item index="sysSetting" @click="routerPush(router, '/admin/sys')">
        <el-icon><img src="../../../public/images/icons/setting.svg" alt=""></el-icon>
        <span class="tit">系统设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { routerPush } from "../../js/index";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute()
const isCollapse = ref(false);
const activePath = ref("home");
activePath.value = route.path.split('/admin/')[1] || 'home'
const handleUpdate = (index) => {
  activePath.value = index
}
</script>

<style lang="scss">
#container {
  height: 100%;
  #logo {
    width: 100%;
    height: 100px;
    background-color: #2f3d53;
    border: none;
    display: flex;
    justify-content: center;
    ju
    img {
      height: 50px;
      margin-top: 25px;
      margin-left: 0px;
    }
    
  }
  .el-menu {
    width: 100%;
    border: none;
    .tit {
      color: #fff;
      font-size: 16px;
      font-family: system-ui, -apple-system;
    }
    .el-menu-item {
      background-color: #3b4c63;
      &:hover {
        background-color: #45556b;
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      height: 100%;
    }
    .el-sub-menu {
      height: auto;
      background-color: #3b4c63;
      .el-sub-menu__title {
        &:hover {
          background-color: #45556b;
        }
        .el-sub-menu__icon-arrow {
          color: #fff;
        }
      }
      .el-menu-item-group {
        margin-top: 0px;
        .el-menu-item-group__title {
          display: none;

          &:hover {
            background-color: #45556b;
          }
        }
        .el-menu-item {
          padding-left: 60px;
          background-color: #2e3e52;
          &:hover {
            background-color: #45556b;
          }
        }
      }
    }
    .el-icon {
      img {
        width: 20px;
        padding-right: 20px;
      }
    }
  }
}</style>
