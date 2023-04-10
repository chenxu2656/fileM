<template>

    <el-table :data="filterTableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="#" type="index"/>
        <el-table-column label="申报人" prop="createName" width="100"/>
        <el-table-column label="项目名称" prop="projectName" width="400"/>
        <el-table-column label="组别" prop="createStuPhone" width="150"/>
        <el-table-column label="学院" prop="createStuPhone" width="150"/>
        <el-table-column label="联系方式" prop="createStuPhone"/>
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" placeholder="Type to search" size="small"/>
            </template>
            <template #default="scope">
                <!--                <el-button size="small" @click="handleDetail(scope.row)">查看信息</el-button>-->
                <el-button size="small" @click="handleDetail(scope.row)">查看评分</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>
<style lang="scss" scoped>
.el-table {
  ::v-deep th .cell {
    font-size: 16px;
    color: rgb(51, 64, 80);
  }

  ::v-deep td .cell {
    font-size: 15px;
    color: rgb(51, 64, 80);
    //overflow: hidden;
    //text-overflow: ellipsis;
    //white-space: nowrap;
    //&:hover {
    //  text-overflow: inherit;
    //  overflow: visible;
    //  white-space: normal;
    //}
  }
}
</style>
<script setup>
import {onMounted, ref, computed} from "vue";
import apiRequest from '../../../http'
import errMsgPopup from "@/utils/errorHandle";
import {routerPush} from "@/js";
import {useRouter} from "vue-router";

const declareList = ref()
const selectFiles = ref()
const search = ref("")
const router = useRouter();
// const handleDeclareList = async(projectId,page,count)=>{
//     // 页数、每页条数
// }
const getDeclareList = async (id) => {
    const resp = await apiRequest({
        url: `/api/project/fileList?id=${id}`,
        method: "get"
    })
    if (resp.status == 200) {
        return resp.msg
    } else {
        errMsgPopup.errorPopup(`删除失败，${resp.msg}`)
    }
}
const handleSelectionChange = (selected) => {
    selectFiles.value = selected
}
const filterTableData = computed(() =>
    declareList.value ?
        declareList.value.filter(
            (data) =>
                !search.value ||
                data.projectName.toLowerCase().includes(search.value.toLowerCase())
        ) : ''
)
const handleDetail = (data) => {
    routerPush(router, '/admin/competition/declarelist/detail')
    localStorage.setItem('detailInfo', JSON.stringify(data))
}
onMounted(async () => {
    localStorage.getItem('detailInfo') && localStorage.removeItem('detailInfo')
    const projId = localStorage.getItem('projectId')
    console.log(projId)
    declareList.value = await getDeclareList('6413118286927d12efc5d989')
})
</script>