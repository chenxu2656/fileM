<template>
    <div id="container">
        <div id="logo">
            <img alt="" src="../../../public/images/icons/chuangye.png" srcset="">
        </div>
        <el-menu :collapse="isCollapse" :default-active="activePath" class="el-menu-vertical-demo"
                 @select="handleUpdate">
            <el-menu-item index="home" @click="routerPush(router, '/judgeAdmin')">
                <el-icon><img alt="" src="../../../public/images/icons/dashboard.svg"></el-icon>
                <span class="tit">DashBoard</span>
            </el-menu-item>
            <el-sub-menu index="my">
                <template #title>
                    <el-icon><img alt="" src="../../../public/images/icons/user.svg"></el-icon>
                    <span class="tit">我的评审</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="admin" @click="routerPush(router, '/judgeAdmin/waitingList')">
                        <span class="tit">等待评审</span>
                    </el-menu-item>
                    <el-menu-item index="stu" @click="routerPush(router, '/judgeAdmin/finishedList')">
                        <span class="tit">完成评审</span></el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </div>
</template>
<script setup>
import {ref} from "vue";
import {routerPush} from "../../js/index";
import {useRouter, useRoute} from "vue-router";

const router = useRouter();
const route = useRoute()
const isCollapse = ref(false);
const activePath = ref("home");
activePath.value = route.path.split('/admin/')[1] || 'home'
const handleUpdate = (index) => {
    activePath.value = index
}
</script>

<style lang="scss">
#container {
    height: 100%;

    #logo {
        width: 100%;
        height: 100px;
        background-color: #2f3d53;
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;

        img {
            height: 80px;
            object-fit: contain;
        }

    }

    .el-menu {
        width: 100%;
        border: none;

        .tit {
            color: #fff;
            font-size: 16px;
            font-family: system-ui, -apple-system;
        }

        .el-menu-item {
            background-color: #3b4c63;

            &:hover {
                background-color: #45556b;
            }
        }

        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            height: 100%;
        }

        .el-sub-menu {
            height: auto;
            background-color: #3b4c63;

            .el-sub-menu__title {
                &:hover {
                    background-color: #45556b;
                }

                .el-sub-menu__icon-arrow {
                    color: #fff;
                }
            }

            .el-menu-item-group {
                margin-top: 0px;

                .el-menu-item-group__title {
                    display: none;

                    &:hover {
                        background-color: #45556b;
                    }
                }

                .el-menu-item {
                    padding-left: 60px;
                    background-color: #2e3e52;

                    &:hover {
                        background-color: #45556b;
                    }
                }
            }
        }

        .el-icon {
            img {
                width: 20px;
                padding-right: 20px;
            }
        }
    }
}</style>
