<template>
    <div id="con">
        <div id="table">
            <el-table :data="filterTableData" stripe style="width: 100%"> <!-- @selection-change="handleSelectionChange" -->
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="#" />
                <el-table-column prop="name" label="文件夹名" width="200" />
                <el-table-column align="right" id="operation">
                    <template #header>
                        <el-input v-model="search" placeholder="根据用户名搜索" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="handleUpdate(scope.row), rowIndex=scope.$index , titleInfo='更新信息'"
                            type="primary">修改信息</el-button>
                        <el-button size="small" @click="deleteFolder(scope.$index, scope.row._id)" type="danger"
                            plain>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div id="createFolder">
            <el-input class="folderName" v-model="folderInfo.folderName" autocomplete="off" />
            <el-button class="create" @click="createFolder(folderInfo.folderName) , folderInfo.folderName = '' ">创建文件夹</el-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#header {
    text-align: left;
    margin: 20px 0px;
}

#con {
    display: flex;
    width: 100%;
    justify-content: space-between;
    #table {
        width: 60%;

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

    #createFolder {
        width: 40%;
        margin-left: 2%;
        height: 100px;
        .folderName{
            height: 40px;
        }
        .create {
            margin-top: 20px;
            background-color: $base_color_lightBlue;
            color: white;
            position: relative;
        }
    }
    
}
</style>
<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import apiRequest from "../../../../http";
import errMsgPopup from '@/utils/errorHandle';
const folderList = ref([])
const search = ref('')
const titleInfo = ref('创建文件夹')
const rowIndex = ref()
const folderInfo = reactive({
    folderName: "",
    _id: ""
})

// const handleUpdate = async(info) => {
//     userInfo.userName = info.userName,
//     userInfo.phoneNumber = info.phoneNumber,
//     userInfo.loginName = info.loginName,
//     userInfo._id = info._id
//     dialogVisible.value = !dialogVisible.value
// }
const getFolderList = async () => {
    const resp = await apiRequest({
        url: "/api/news/folder",
        method: 'get'
    })
    if (resp.status == 200) {
        folderList.value = resp.msg
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}

const createFolder = async(folderName)=>{
    const resp = await apiRequest({
        url: "/api/news/folder/cd",
        method: 'post',
        params: {
            name: folderName
        }
    })
    if (resp.status == 200) {
        folderList.value.unshift(resp.msg)
        console.log(resp);
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
// const updateUser = async(index,info)=>{
//     const resp = await apiRequest({
//         url: "/api/user/register",
//         method: 'post',
//         params: {
//             type: 'judge',
//             userName: info.userName,
//             loginName: info.loginName,
//             password: info.password,
//             phoneNumber: info.phoneNumber,
//             _id: info._id
//         }
//     })
//     if (resp.status == 200) {
//         userList.value[index] = resp.msg
//         clearReactive(info)
//         rowIndex.value = null
//     } else {
//         errMsgPopup.errorPopup(resp.msg)
//     }
// }
const filterTableData = computed(() =>
    folderList.value.filter(
        (data) =>
            !search.value ||
            data.folderName.toLowerCase().includes(search.value.toLowerCase())
    )
)
const deleteFolder = async (index, id)=> {
    const resp = await apiRequest({
        url: "/api/news/dx",
        method: 'post',
        params: {
            id: id
        }
    })
    if (resp.status == 200) {
        console.log(resp);
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
onMounted(async () => {
    await getFolderList()
})


</script>