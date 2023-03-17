<template>
  <div id="swiper">
    <div id="swiperContain">
      <div v-for="item in itemList" :key="item" style class="swiperImg">
        {{ item }}
      </div>
    </div>

  </div>
</template>
<style lang="scss" scoped>
#swiper {
  width: 100%;
  height: 500px;
  background-color: black;
  overflow: hidden;

  #swiperContain {
    width: 500%;
    animation: slidein 30s infinite  linear;

@keyframes slidein {
  0%,5%{
    margin-left:0px;
  }
  10%,15%{
      margin-left:-100vw;
  }
  20%,25%{
      margin-left:-200vw;
  }
  30%,35%{
      margin-left:-300vw;
  }
  40%,45%{
      margin-left:-400vw;
  }
  50%,55%{
      margin-left:-300vw;
  }
  60%,65% {
    margin-left: -200vw;

  }
  70%,75% {
    margin-left: -100vw;
  }
  80%,85% {
    margin-left: 0vw;
  }
    }
    .swiperImg {
      background-color: yellow;
      width: 100vw;
      height: 500px;
      // position: absolute;
      float: left;

    }
  }

}
</style>
<script setup>
import { ref } from 'vue'
const itemList = ref([1, 2, 3, 4,5])
</script>