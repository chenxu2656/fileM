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
            <div id="operation">
                <img src="../../../public/images/icons/editSquare.svg" alt="" srcset="" @click="editProject(project)">
                <img src="../../../public/images/icons/delete.svg" alt="" srcset="">
            </div>
            <div class="tit">
                <div class="lineC">{{ project.projectName }}</div>
            </div>
            <el-divider></el-divider>
            <div  class="line">
                <div class="lineT">开始时间: </div>
                <div class="lineC">{{ project.sTime.split('T')[0] }}</div>
            </div>
            <div  class="line">
                <div class="lineT">截止时间: </div>
                <div class="lineC">{{ project.eTime.split('T')[0] }}</div>
            </div>
            <div class="actionBottom">
                <el-button @click="editProject(project)">申报管理</el-button>
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
        margin: auto;
        justify-content: center;
        flex-wrap: wrap;
        .projectList{
            align-self: flex-start;
            
            margin: 10px 10px 10px 0px;
            width: 24%;
            min-width: 250px;
            height: 250px;
            background-color: #fff;
            font-size: 14px;
            border-radius: 5px;
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
            #operation{
                padding: 10px 20px;
                text-align: right;
                img {
                    width: 30px;
                    cursor: pointer;
                }
            }
            .tit{
                width: 100%;
                height: auto;
                display: flex;
                font-size: 19px;
                color: #4a69dd;
                font-weight: 700;
                flex-direction: column;
                justify-content: center;
            }
            .el-divider{
                margin: 10px 0px;
            }
            .line {
                display: flex;
                font-size: 17px;
                justify-content: center;
                padding: 5px 0px;
                .lineT {
                    text-align: right;
                    padding-right: 20px;
                }
            }
            .actionBottom{
                padding: 20px 20px;
                display: flex;
                justify-content: right;
                .el-button{
                 width: 60%;   
                }
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