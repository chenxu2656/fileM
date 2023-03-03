<template>
    <div id="createItem">
        <div id="create">
           <img src="../../../public/images/icons/create.png" alt="" srcset="">
           <div id="tit" @click="routerPush(router, '/admin/creatItem')">创建项目</div>
        </div> 
    </div>
    <el-divider />
    <div id="itemList">
        <div class="projectList" v-for="project in projectList" :key="project._id"> 
            <div class="actionTop"><img src="../../../public/images/icons/edit.svg" alt="编辑" srcset="" @click="editProject(project)"></div>
            <div class="line">
                <div class="lineT">项目名称: </div>
                <div class="lineC">{{ project.projectName }}</div>
            </div>
            <div  class="line">
                <div class="lineT">开始时间: </div>
                <div class="lineC">{{ project.sTime }}</div>
            </div>
            <div  class="line">
                <div class="lineT">结束时间: </div>
                <div class="lineC">{{ project.eTime }}</div>
            </div>
            <div class="actionBottom">
                <el-button type="success">文件提交</el-button>
                <el-button type="warning">项目评审</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    #createItem {
        height: 120px;
        cursor: pointer;
        #create {
            width: 300px;
            height: 100px;
            top: 15px;
            background-color: #0aa344;
            border-radius: 10px;
            img {
                display: inline-block;
                height: 60px;
                margin-top: 20px;
                vertical-align: top;
                margin-left: 10px;
                
            }
            #tit {
                display: inline-block;
                height: 60px;
                margin-top: 20px;
                vertical-align: top;
                line-height: 60px;
                font-size: 30px;
                font-family: "songti";
                margin-left: 20px;
                color: #fff;
            }
          
        }
    }
    #itemList{
        display: flex;
        width: 80vw;
        // justify-content: space-between;
        flex-wrap: wrap;
        .projectList{
            margin: 10px 20px 10px 0px;
            width: 300px;
            height: 140px;
            background-color: #409EFF;
            font-size: 14px;
            border-radius: 10px;
            .actionTop {
                width: 100%;
                text-align: right;
                img {
                    width: 20px;
                    padding-top: 10px;
                    position: relative;
                    right: 15px;
                    cursor: pointer;
                }
            }
            .line {
                display: flex;
                .lineT {
                    color: #fff;
                    width: 80px;
                    text-align: right;
                    padding-right: 20px;
                }
                .lineC{
                    color: #fff;
                }
            }
            .actionBottom{
                    padding-top: 5px;
            }
                
        }
    }
</style>
<script setup>
import { routerPush } from "../../js/index";
import { useRouter } from "vue-router";
import apiRequest from '../../../http'
import { ref , onMounted} from "vue";
const router = useRouter();
const projectList = ref("")
const getProjectList = async () =>{
    const resp = await apiRequest({
        methpd: "get",
        url: "/api/project/list",
    })
    console.log(resp);
    if (resp.status == '200') {
        return resp.msg
    } 
    return []
}
const editProject = (project)=>{
    console.log(project);
    localStorage.setItem('editInfo',JSON.stringify(project))
    routerPush(router, '/admin/creatItem')
}
onMounted(async () => {
    projectList.value = await getProjectList()
})

</script>