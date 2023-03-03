<template>
    <div id="createItem">
        <div id="create">
           <div id="tit" @click="routerPush(router, '/admin/creatItem')" class="firstTit">我创建的</div>
           <el-divider></el-divider>
           <div class="proList">
                <div v-for="o in cProLsit" class="box-card" :key="o">
                    <div class='lheader'>
                        {{ o.projectName }}
                    </div>
                    <div class="editArea">
                        <span>编辑</span>
                        <span>删除</span>
                    </div>
                    <el-divider></el-divider>
                    <div class="labelInfo">项目赛道: {{ o.Grouping?o.Grouping:'主赛道'  }}</div>
                    <div class="labelInfo">负责人: {{ o.createName }}</div>
                </div>
           </div>
        </div> 
        
        <div id="Join">
           <div id="tit" @click="routerPush(router, '/admin/creatItem')" class="firstTit">我参与的</div>
           <el-divider></el-divider>
        </div> 
    </div>
    
</template>
<style lang="scss" scoped>
    #createItem{
        .firstTit {
            text-align: center;
            padding: 10px 20px 10px 0px;
            font-size: 22px;
            font-weight: 600;
        }
        .proList{
            display: flex;
            flex-wrap: wrap;
            .box-card{
                width: 320px;
                height:290px;
                margin: 10px;
                background-color: #fff;
                box-shadow: 0 0 10px #dcdfe6;
                .el-divider{
                    margin: 10px 0px;
                }
                .lheader{
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #416ae5;
                    font-weight: 600;
                    padding: 10px 15px 0 15px;
                    font-size: 19px;
                }
                .editArea{
                    font-size: 12px;
                    padding: 0 15px;
                    text-align: right;
                    span {
                        padding: 10px;
                    }
                }
                .labelInfo{
                    padding: 5px 10px;
                }
            }
        }
    }
</style>
<script setup>
// import { routerPush } from "../../js/index";
// import { useRouter } from "vue-router";
import {getVFromLocalStorage} from '../../js'
import apiRequest from '../../../http'
import { ref , onMounted} from "vue";
// const router = useRouter();
// const projectList = ref("")
// 获取创建的项目
const userId = ref('')
const cProLsit = ref([])
const jProLsit = ref([])
const getCList = async (isJoin) =>{
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
// const editProject = (project)=>{
//     console.log(project);
//     localStorage.setItem('editInfo',JSON.stringify(project))
//     routerPush(router, '/admin/creatItem')
// }
onMounted(async () => {
    userId.value = getVFromLocalStorage('uInfo','_id')
    cProLsit.value = await getCList()
    jProLsit.value = await getCList('j')
})

</script>