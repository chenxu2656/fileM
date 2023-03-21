<template>
  <div class="home">
    <SwiperCon/>
    <!-- <NotificationStu/>
    <NotificationTeacher/> -->
    <NewsList/>
    <NotificationList/>
  </div>
</template>

<script setup>
import NotificationList from '@/components/front/NotificationList.vue';
// import NotificationTeacher from '@/components/front/NotificationTeacher.vue';
import NewsList from '@/components/front/NewsList.vue';
import SwiperCon from '@/components/front/SwiperCon.vue';
// @ is an alias to /src
</script>
<style lang="scss" scoped>
</style>