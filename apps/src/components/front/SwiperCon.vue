<template>
    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
</template>
<style lang="scss" scoped>
.el-carousel{
  height: 500px;
  .el-carousel__item {
    background-color: red;
  }
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

</style>
<script setup>
// import { ref } from 'vue'
</script>