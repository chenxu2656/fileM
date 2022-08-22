<template>
<div id="content">
<div id="pending" class="list">
    <div id="title" class="header">
        正在申报
    </div>
    <div id="pendlist" class="conlist">
        <div v-for="item in tableData" :key="item.name" class="declareList">
        {{item.name}} 
        </div>
    </div>
</div>

<div id="history" class="list">
    <div id="id" class="header">
        申报历史
    </div>
    <div id="historylist" class="conlist">

    </div>
</div>
</div>

</template>
<style lang="scss" scoped>
#content{
    width: 1200px;
    margin: auto;
    .list{
        margin-top: 20px;
    .header{
        margin: auto;        
        display: block;
        height: 56px;
        width: 240px;
        background-color: #a2d5f2;
        line-height: 56px;
        border-radius: 28px;
    }
    .conlist{
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        box-sizing: border-box;
        // justify-content: space-around;
        .declareList{
            display: block;
            width: 300px;
            border: 10px solid white;
            box-sizing: border-box;
            background-color: #a2d5f2;
            height: 180px;
            margin-top: 20px;
        }
    }
}
}

</style>
<script setup>
import {reactive} from 'vue'
const tableData = reactive([
    {
        name: '第八届 “互联网+” 创新创业大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    },
    {
        name: '第七届 “挑战杯” 创新创业大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    },
    {
        name: '第6届全国大学生计算机大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    },
    {
        name: '第七届 “挑战杯” 创新创业大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    },
    {
        name: '第6届全国大学生计算机大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    },
    {
        name: '第七届 “挑战杯” 创新创业大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    },
    {
        name: '第6届全国大学生计算机大赛',
        startTime: '2022-06-22',
        endTime: "2022-08-22",
        admin: '梁振'
    }
   ])
</script>