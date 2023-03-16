<template>
    <div id="createItem">
        <div id="create">
            <div id="tit" class="firstTit">
                <img src="../../../public/images/icons/hot.svg" alt="" class="icon">
                <span id="onp">火热申报中</span>
            </div>
            <el-divider></el-divider>
            <div class="projectList" v-for="project in projectList" :key="project._id">
                <div class="tit">
                    <div class="lineC">{{ project.projectName }}</div>
                </div>
                <el-divider></el-divider>
                <div class="line">
                    <div class="lineT">开始时间: </div>
                    <div class="lineC">{{ project.sTime.split('T')[0] }}</div>
                </div>
                <div class="line">
                    <div class="lineT">截止时间: </div>
                    <div class="lineC">{{ project.eTime.split('T')[0] }}</div>
                </div>
                <div class="progress">

                </div>
                <div class="actionBottom">
                    <el-button @click="startDeclare(project._id)">立即申报</el-button>
                </div>
            </div>
        </div>

        <div id="Join">
            <div id="tit"  class="firstTit">
                <img src="../../../public/images/icons/history.svg" alt="" class="icon">
                <span id="afterp">历史申报及获奖项目</span>
            </div>
            <el-divider></el-divider>
            <div class="projectList" v-for="project in projectList" :key="project._id" id="history">
                <div class="tit">
                    <div class="lineC">{{ project.projectName }}</div>
                </div>

                <div class="actionBottom">
                    <el-button>查看获奖项目</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#createItem {
    .firstTit {
        text-align: center;
        padding: 10px 20px 10px 0px;
        font-size: 22px;
        font-weight: 600;
        display: flex;
        justify-content: left;
        align-items: center;

        .icon {
            height: 32px;
            margin: 0px 20px;
        }

        ;

        span {
            &#onp {
                background: linear-gradient(to right, #ff5b53, #ffde9e);
                -webkit-background-clip: text;
                color: transparent;
            }

            &#afterp {
                background: linear-gradient(to right, #0b3e27, #92e8bc);
                -webkit-background-clip: text;
                color: transparent;
            }

        }
    }

    .projectList {
        align-self: flex-start;
        margin: 10px 10px 10px 0px;
        width: 24%;
        min-width: 270px;

        @media screen and (max-width: 600px) {
            min-width: 400px;
        }

        height: 250px;
        background-color: #fff;
        font-size: 14px;
        border-radius: 5px;

        .tit {
            width: 100%;
            height: auto;
            padding: 20px 10px;
            display: flex;
            font-size: 17px;
            color: $base_color_lightBlue;
            font-weight: 700;
            flex-direction: column;
            justify-content: center;
        }

        .el-divider {
            margin: 10px 0px;
        }

        .line {
            display: flex;
            font-size: 17px;
            justify-content: center;
            padding: 5px 0px;
            color: $base_color_darkBlue;
            font-weight: 500;

            .lineT {
                text-align: right;
                padding-right: 20px;
            }
        }

        .progress {
            height: 20px;
        }

        .actionBottom {
            padding: 20px;
            display: flex;
            justify-content: center;

            .el-button {
                width: 60%;
            }
        }

    }
    #history{
        height: 150px;
    }
}
</style>
<script setup>
// import { routerPush } from "../../js/index";
import { useRouter } from "vue-router";
import { getVFromLocalStorage, routerPush } from '../../js'
import apiRequest from '../../../http'
import { ref, onMounted } from "vue";
const router = useRouter()
const projectList = ref("")
const userId = ref('')
const cProLsit = ref([])
const jProLsit = ref([])
const getCList = async (isJoin) => {
    console.log(isJoin);
    const resp = await apiRequest({
        methpd: "get",
        url: `/api/user/proList`,
        params: {
            u: userId.value,
            j: isJoin
        }
    })
    if (resp.status == '200') {
        return resp.msg
    }
    return []
}
const getProjectList = async () => {
    const resp = await apiRequest({
        methpd: "get",
        url: "/api/project/list",
    })
    if (resp.status == '200') {
        return resp.msg
    }
    return []
}
const startDeclare = (projectid) => {
    routerPush(router, `/stuadmin/upload?id=${projectid}`)
}
onMounted(async () => {
    projectList.value = await getProjectList()
    userId.value = getVFromLocalStorage('uInfo', '_id')
    cProLsit.value = await getCList()
    jProLsit.value = await getCList('j')
})

</script>