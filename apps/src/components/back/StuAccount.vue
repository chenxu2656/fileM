<template>

    <div id="con">
        <div id="table">
             <el-table :data="filterTableData" stripe style="width: 100%">   <!-- @selection-change="handleSelectionChange" -->
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="#" />
                <el-table-column prop="name" label="姓名" width="200" />
                <el-table-column prop="studentId" label="学号" width="200" />
                <el-table-column prop="phoneNumber" label="手机号" width="200" />

                <el-table-column prop="college" label="学院" width="200" />
                <el-table-column prop="role" label="年级" width="200" />
                <el-table-column prop="grade" label="入学年份" width="200" />
                <el-table-column align="right" id="operation">
                    <template #header>
                        <el-input v-model="search" placeholder="根据用户名搜索" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="deleteUser(scope.$index, scope.row._id)" type="danger" plain>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
import { ref, onMounted ,computed} from 'vue'
import apiRequest from "../../../http";
import errMsgPopup from '@/utils/errorHandle';
const userList = ref([])
const search = ref('')
const getUserList = async () => {
    const resp = await apiRequest({
        url: "/api/user/userList",
        method: 'get',

    })
    if (resp.status == 200) {
        console.log(resp.msg);
        userList.value = resp.msg
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}
const deleteUser = async(index, id)=>{
    const resp = await apiRequest({
        url: "/api/user/delete",
        method: 'post',
        params: {
            id: id,
        }
    })
    if (resp.status == 200) {
        errMsgPopup.generalPopUp('删除成功',1000)
        userList.value.splice(index,1)
    } else {
        errMsgPopup.errorPopup(resp.msg)
    }
}

const filterTableData = computed(() =>
    userList.value.filter(
        (data) =>
        !search.value ||
        data.userName.toLowerCase().includes(search.value.toLowerCase())
    )
)
onMounted(async () => {
    await getUserList()
})


</script>