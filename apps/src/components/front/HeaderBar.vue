<template>
  <div id="header">
    <div id="con">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content ep-bg-purple" />
          <div id="title">
            <img src="../../../public/images/icons/chuangye.png" alt="" srcset="">
          </div>
        </el-col>
        <el-col :span="14">

          <div class="grid-content ep-bg-purple" />
          <el-menu :default-active="home" :ellipsis="false" :router="true" class="el-menu-demo" mode="horizontal"
            @select="handleSelect">
            <div class="flex-grow" />
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="stu">项目申报（学生）</el-menu-item>
            <el-menu-item index="teacher">项目申报（教师）</el-menu-item>
            <el-menu-item index="teacher">公示平台</el-menu-item>
          </el-menu>
        </el-col>
        <!-- <el-col :span="4" id="reg"><div id="reg">注册/登录</div></el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script setup>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#header {
  background-color: #fff;
  color: $base_color_darkBlue;
  #con {
    width: 100%;
    max-width: 1200px;
    height: 87px;
    margin: auto;
    .el-row {
      box-sizing: content-box;
      height: 87px;
      #title {
        font-size: 28px;
        height: 100%;
        display: flex;
        align-items: center;
        img {
          height: 80px;
        }
      }

      .el-menu {
        background-color: #fff;
        border: none;
        .flex-grow {
          flex-grow: 1;
        }
        .el-menu-item {
          line-height: 87px;
          font-size: 17px;
          color: $base_color_darkBlue;
          font-weight: 500;
        }
      }

    }
  }
}</style>
