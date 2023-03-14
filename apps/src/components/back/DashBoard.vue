<template>
    <div id="con">
        <div id="title">
            <div id="p1Title">Dashboard</div>
            <div id="p2Title">欢迎, {{ username }}, 一切都好。</div>
        </div>
        <div id="row1Bar">
            <div v-for="item in dashBoardList" class="item" :key="item.title">
                <div class="topView">
                    <div class="part1">
                        <div class="number">{{ item.number }}</div>
                        <div class="part1Tit"> {{ item.title }}</div>
                    </div>
                    <div class="part2">
                        <img :src="item.icon" alt="" srcset="">
                    </div>
                </div>
                <div class="bottomView" @click="routerPush(router,item.path)">
                    <div class="bottomTitle"> {{ item.jumpTitle }}</div>
                    <img :src="rightArrow" alt="">
                </div>
                
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
// https://demo.pixelcave.com/oneui-vue-edition/#/backend/dashboard
#con {
    width: 78vw;
    margin: 20px auto;
    height: auto;
    #title {
        width: 100%;
        text-align: left;
        font-size: 24px;

        font-weight: 700;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Liberation Sans, Arial, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        #p1Title {
            color: #324254;
        }
        #p2Title {
            margin-top: 20px;
            font-size: 16px;
            color: #6c757d;
        }
    }
    #row1Bar{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
            width: 24%;
            height: 160px;
            min-width: 200px;
            margin-top: 20px;
            @media screen and (max-width: 600px) {
                width: 100%;
            }
            .topView {
                width: 100%;
                height: 120px;
                box-sizing: border-box;
                padding: 10px 20px;
                background-color: white;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .part1 {
                    width: 60%;
                    height: 80px;
                    .number {
                        text-align: left;
                        font-size: 30px;
                        font-weight: 700;
                        color: #324254;
                    }
                    .part1Tit {
                        text-align: left;
                        padding: 10px 0px;
                        font-size: 18px;
                        font-weight: 600;
                        color: #6c757d;
                    }
                }
                .part2 {
                    width: 60px;
                    height: 60px;
                    background-color: #f6f7f9;
                    border-radius: 18px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 35px;
                    }
                }
            }
            .bottomView {
                width: 100%;
                height: 40px;
                background-color: #f6f7f9;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding: 0px 10px;
                cursor: pointer;
                .bottomTitle {
                    display: inline-block;
                    vertical-align: top;
                    text-align: left;
                    padding: 10px;
                    color: #457bda;
                    font-size: 15px;
                    font-weight: 600;
                }
                img {
                    height: 25px;
                }
            }
        }
    }
}
</style>

<script setup>
import stuIcon from '../../../public/images/icons/stuIcon.svg'
import adminIcon from '../../../public/images/icons/adminIcon.svg'
import judgeIcon from '../../../public/images/icons/judgeIcon.svg'
import projectIcon from '../../../public/images/icons/projectIcon.svg'
import rightArrow from '../../../public/images/icons/rightArrow.png' 
import { ref } from 'vue'
import { routerPush } from '@/js'
import {useRouter} from 'vue-router'
const username = ref("许晨晨")
const router = useRouter()

const dashBoardList = ref([
{
        number: 32 ,
        title: "项目数量",
        jumpTitle: "查看项目列表",
        path: "/admin/competition",
        icon: projectIcon
    },
    {
        number: 32 ,
        title: "评审专家数量",
        jumpTitle: "评审专家管理",
        path: "/admin/account/judge",
        icon: judgeIcon
    },
    {
        number: 32 ,
        title: "管理员数量",
        jumpTitle: "管理员账户管理",
        path: "/admin/account/admin",
        icon: adminIcon
    },    
{
        number: 32 ,
        title: "注册用户数量",
        jumpTitle: "查看学生列表",
        path: "/admin/account/stu",
        icon: stuIcon
    }
])
</script>

  