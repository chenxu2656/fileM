<template>
    <div id="header">
        <el-button @click="dialogVisible = !dialogVisible , titleInfo='创建学院'">创建学院</el-button>
    </div>
    <div id="con">
        <div id="table">
             <el-table :data="filterTableData" stripe style="width: 100%">   <!-- @selection-change="handleSelectionChange" -->
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="#" />
                <el-table-column prop="name" label="学院名" width="200" />
                <el-table-column align="right" id="operation">
                    <template #header>
                        <el-input v-model="search" placeholder="根据用户名搜索" />
                    </template>
                    <!-- <template #default="scope">
                        <el-button size="small" @click="deleteInstitute(scope.$index, scope.row._id)" type="danger" plain>删除</el-button>
                    </template> -->
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog
    v-model="dialogVisible"
    :title="titleInfo"
    width="30%"
    :before-close="handleClose"
  >
  <el-form
    :model="instituteInfo"
    status-icon
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="学院名" prop="name">
      <el-input v-model="instituteInfo.name"  autocomplete="off" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearReactive(instituteInfo), dialogVisible = !dialogVisible" plain >取消</el-button>
        <el-button type="primary" @click="createInstitute(instituteInfo), dialogVisible = !dialogVisible">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
#header {
    text-align: left;
    margin: 20px 0px;
}

#con {
    display: flex;
    width: 100%;

    #table {
        width: 100%;
        .el-table {
            ::v-deep th .cell {
                font-size: 16px;
                color: rgb(51, 64, 80);
                height: 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            ::v-deep td .cell {
                font-size: 15px;
                height: 35px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: rgb(51, 64, 80);
            }

            ::v-deep tr {
                td:last-child .cell {
                    display: flex;
                    flex-direction: row;
                    justify-content: right;
                    align-items: center;
                }
            }

        }
    }

    #createAccount {
        width: 40%;
        margin-left: 2%;
        height: 100px;
    }
}
</style>
<script setup>
import { ref, onMounted ,reactive,computed} from 'vue'
import apiRequest from "../../../http";
import errMsgPopup from '@/utils/errorHandle';
import {clearReactive} from '@/js/index'
const instituteList = ref([])
const search = ref('')
const dialogVisible = ref(false)
const titleInfo = ref('创建学院')
const instituteInfo =  reactive({
    name: "",
    _id: ""
})
const handleClose = async()=>{
    clearReactive(instituteInfo)
    dialogVisible.value = !dialogVisible.value
}

const getInstituteList = async () => {
    const resp = await apiRequest({
        url: "/api/institute",
        method: 'get',
    })
    if (resp.status == 200) {
        instituteList.value = resp.msg
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
// const deleteInstitute = async(index, id)=>{
//     const resp = await apiRequest({
//         url: "/api/institute/delete",
//         method: 'post',
//         params: {
//             id: id,
//         }
//     })
//     if (resp.status == 200) {
//         errMsgPopup.generalPopUp('删除成功',1000)
//         instituteList.value.splice(index,1)
//     } else {
//         errMsgPopup.errorPopup(resp.msg)
//     }
// }
const createInstitute = async(info)=>{
    const resp = await apiRequest({
        url: "/api/institute",
        method: 'post',
        params: {
            name: instituteInfo.name,
        }
    })
    if (resp.status == 200) {
        instituteList.value.unshift(resp.msg)
        clearReactive(info)
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}

const filterTableData = computed(() =>
    instituteList.value.filter(
        (data) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
onMounted(async () => {
    await getInstituteList()
})


</script>