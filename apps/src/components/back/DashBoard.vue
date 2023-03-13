<template>
    <div id="title">
        <div id="p1Title">Dashboard</div>
        <div id="p2Title">欢迎, {{ username }}, 一切都好。</div>
    </div>
</template>
<style lang="scss" scoped>
// https://demo.pixelcave.com/oneui-vue-edition/#/backend/dashboard
#title {
    width: 80vw;
    text-align: left;
}
</style>
<script setup>
import {ref} from 'vue'
const username = ref("许晨晨")
</script>

  