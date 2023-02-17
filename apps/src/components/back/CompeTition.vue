<template>
    <div id="createItem">
        <div id="create">
           <img src="../../../public/images/icons/create.png" alt="" srcset="">
           <div id="tit" @click="routerPush(router, '/admin/creatItem')">创建项目</div>
        </div> 
    </div>
    <el-divider />
    <div id="itemList">

    </div>
</template>
<style lang="scss" scoped>
    #createItem {
        height: 120px;
        #create {
            width: 300px;
            height: 120px;
            top: 15px;
            background-color: #409EFF;
            border-radius: 10px;
            img {
                display: inline-block;
                height: 60px;
                margin-top: 30px;
                vertical-align: top;
                margin-left: 10px;
            }
            #tit {
                display: inline-block;
                height: 60px;
                margin-top: 30px;
                vertical-align: top;
                line-height: 60px;
                font-size: 30px;
                font-family: "songti";
                margin-left: 20px;
                color: #fff;
            }
        }
    }
</style>
<script setup>
import { routerPush } from "../../js/index";
import { useRouter } from "vue-router";
const router = useRouter();
</script>