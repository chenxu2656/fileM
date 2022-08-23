<template>
  <div id="header">
    <div id="con">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content ep-bg-purple" />
          <div id="title">项目申报管理系统</div>
        </el-col>
        <el-col :span="14">
          
          <div class="grid-content ep-bg-purple" />
          <el-menu :default-active="home" 
          :ellipsis="false"
          :router="true"
          class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
#header{
  background-color: #2d67bb;
  color: white;
  #con{
    width: 1200px;
    height: 70px;
    margin: auto;
    .el-row{
      box-sizing: content-box;
      height: 70px;
      #title{
        line-height: 70px;
        font-size: 28px;
      }
      .el-menu{
        background-color: #2d67bb;
        
border-bottom: 0px;
      .flex-grow{
        flex-grow: 1;
      }
        .el-menu-item{
          line-height: 70px;
          font-size: 18px;
          border-bottom: 0px;
          color: white;
        }
      }
      
    }
  }
}
</style>
