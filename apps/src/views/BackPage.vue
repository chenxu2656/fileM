<template>
  <el-container>
    <el-aside class="el-aside">
      <BackSidebar />
    </el-aside>
    <el-container id="con">
      <el-header>
        <!-- <div id="title" class="topbarCon">项目申报管理系统</div> -->
        <el-breadcrumb separator="/">
          <div class="pageHeader">
            <el-breadcrumb-item :to="{ path: '/admin' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>promotion management</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </div>
        </el-breadcrumb>
        <!-- <div id="name" class="topbarCon">btfblog 后台管理系统</div> -->
      </el-header>
      <el-main class="el-main">
        <router-view></router-view></el-main>
    </el-container>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<script setup>
import BackSidebar from '@/components/back/BackSidebar.vue';
  // import { useRoute } from 'vue-router'
</script>
<style lang="scss" scoped>
.el-aside {
  width: 13vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  @media screen and (max-width: 600px) {
           display: none;
        }
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: #3b4c63;
}

#con {
  height: calc(100vh - 60px);
  @media screen and (max-width: 600px) {
           width: 100vw;
        }
  .el-header {
    border-bottom: 1px solid gainsboro;
    display: flex;
    height: 60px;
    color: white;
    background-color: #fff;
    justify-content: space-between;

    .el-breadcrumb {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .pageHeader {
        .el-breadcrumb-item {
          font-size: 14px;
        }

      }
    }

    .topbarCon {
      height: 100%;
      vertical-align: middle;
      display: flex;
      align-items: center;
      font-size: 25px;
      font-weight: 700;
    }
  }
  .el-main{
    background-color: #ebedef;

  }
}

.el-footer {
  border-top: 1px solid #dddfe5;
  bottom: 0px;
  height: 60px;
}</style>