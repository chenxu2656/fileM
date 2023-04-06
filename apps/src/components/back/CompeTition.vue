<template>
    <div id="createItem">
        <el-button type="primary" @click="routerPush(router, '/admin/creatItem')">创建项目</el-button>
    </div>
    <!-- <el-divider /> -->
    <div id="itemList">
        <div class="projectList" v-for="project in projectList" :key="project._id"> 
            <div id="operation">
                <img src="../../../public/images/icons/editSquare.svg" alt="" srcset="" @click="editProject(project)">
                <img src="../../../public/images/icons/delete.svg" alt="" srcset="" @click="deleteItem(project)">
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
                <el-button @click="handleDetail(project)">申报详情</el-button>
            </div>
        </div>
    </div>
    <el-dialog
    v-model="dialogVisible"
    title="删除项目"
    width="30%"
    :before-close="handleClose"
  >
    <span>项目删除后无法恢复，关联的比赛文件会自动失效，确认删除？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleDeleteItem(projectId)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
    #createItem {
        width: 80vw;
        margin: 20px auto ;
        cursor: pointer;
        text-align: left;
        padding: 0 10px;
        .el-button {
            background-color: $base_color_darkBlue;
            border: none;
            width: 150px;
            height: 40px;
        }
        
    }
    #itemList {
      display: flex;
      width: 80vw;
      margin: auto;
      @media screen and (max-width: 600px) {
        justify-content: center;
      }
      // justify-content: center;
      flex-wrap: wrap;

      .projectList {
        align-self: flex-start;
        margin: 10px 10px 10px 0px;
        width: 24%;
        min-width: 360px;
        @media screen and (max-width: 600px) {
          min-width: 400px;
        }
        background-color: #fff;
        font-size: 14px;
        border-radius: 5px;
        padding-bottom: 20px;

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

        #operation {
          padding: 10px 20px;
                text-align: right;
                img {
                    width: 25px;
                    padding: 0px 2px;
                    cursor: pointer;
                }
            }
            .tit{
                width: 90%;
                height: auto;
                margin: 0px 5%;
                display: flex;
                font-size: 17px;
                color: $base_color_lightBlue;
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
import errMsgPopup from "@/utils/errorHandle";
// import errMsgPopup from "@/utils/errorHandle";
const router = useRouter();
const projectList = ref("")
let dialogVisible = ref(false)
let projectId = ref("")
const getProjectList = async () =>{
    const resp = await apiRequest({
        methpd: "get",
        url: "/api/project/list",
    })
    if (resp.status == '200') {
        return resp.msg
    } 
    return []
}
const editProject = (project)=>{
    localStorage.setItem('editInfo',JSON.stringify(project))
    routerPush(router, '/admin/creatItem')
}
const deleteItem = async (project)=>{
    dialogVisible.value = true
    projectId.value = project._id
}
const handleDeleteItem = async(id)=>{
    dialogVisible.value = false
    const resp = await apiRequest({
        url: "/api/project/delete",
        method: 'post',
        params: {
            id: id
        }
    })
    if (resp.status == 200) {
        errMsgPopup.generalPopUp('删除成功')
        projectList.value = projectList.value.filter(item=>item._id != id)
    } else {
        errMsgPopup.errorPopup(`删除失败，${resp.msg}`)
    }
}
const handleDetail = (proInfo)=>{
    const id = proInfo._id
    localStorage.setItem('projectId',id)
    routerPush(router,'/admin/competition/declarelist')
}
onMounted(async () => {
    projectList.value = await getProjectList()
    localStorage.getItem('editInfo') && localStorage.removeItem('editInfo')
    localStorage.getItem('projectId') && localStorage.removeItem('projectId')
})

</script>